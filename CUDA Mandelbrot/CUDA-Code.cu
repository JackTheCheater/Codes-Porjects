#include <iostream>
#include <fstream>
#include <chrono>

// Ranges of the set
#define MIN_X -2
#define MAX_X 1
#define MIN_Y -1
#define MAX_Y 1

// Image ratio
#define RATIO_X (MAX_X - MIN_X)
#define RATIO_Y (MAX_Y - MIN_Y)

// Image size
#define RESOLUTION 1000
#define WIDTH (RATIO_X * RESOLUTION)
#define HEIGHT (RATIO_Y * RESOLUTION)
#define STEP ((double) RATIO_X / WIDTH)

// Maximum number of iterations
#define ITERATIONS 100

using namespace std;

__global__ void mandelbrot_kernel(int *image)
{
	int row = blockIdx.y * blockDim.y + threadIdx.y;
	int col = blockIdx.x * blockDim.x + threadIdx.x;

	if (row < HEIGHT && col < WIDTH)
	{
        double x = col * STEP + MIN_X;
        double y = row * STEP + MIN_Y;

        double real = 0.0;
        double imag = 0.0;

		int count = 0;

		for (int i = 0; i < ITERATIONS; i++)
		{
			double new_real = real * real - imag * imag + x;
            double new_imag = 2.0 * real * imag + y;
            real = new_real;
            imag = new_imag;

			//If it is convergent
			if (real * real + imag * imag >= 4.0)
			{
				break;
			}

			count++;
		}

		image[row * WIDTH + col] = count;
	}
}

int main(int argc, char **argv)
{
	int threads = atoi(argv[1]);

	const auto start = chrono::steady_clock::now();

	int *cuda_image;
	cudaMallocManaged(&cuda_image, WIDTH * HEIGHT * sizeof(int*));

	dim3 block_size(threads);
	dim3 image_size((int)(HEIGHT * WIDTH + block_size.x) / block_size.x);

	mandelbrot_kernel <<<image_size, block_size>>> (cuda_image);

	cudaDeviceSynchronize();

	const auto end = chrono::steady_clock::now();
	
	cout << "Time elapsed: " << chrono::duration_cast<chrono::milliseconds> (end - start).count() << " milliseconds." << endl;

	// Write the result to a file
	ofstream matrix_out;

	matrix_out.open("Matrix-file-cuda.txt", ios::trunc);
	if (!matrix_out.is_open())
	{
		cout << "Unable to open file." << endl;
		return -2;
	}

	for (int row = 0; row < HEIGHT; row++)
	{
		for (int col = 0; col < WIDTH; col++)
		{
			matrix_out << cuda_image[row * WIDTH + col];

			if (col < WIDTH - 1)
				matrix_out << ',';
		}

		if (row < HEIGHT - 1)
			matrix_out << endl;
	}

	matrix_out.close();

	cudaFree(cuda_image);
	return 0;
}
