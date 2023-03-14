#include <stdio.h>
#include <mpi.h>  
#include <math.h>
      
#define PI25DT 3.141592653589793238462643

#define INTERVALS 100000000000

int main(int argc, char **argv)
{
    long int intervals = INTERVALS;
	double x, dx, sum, pi, mypi;
	int rank, nproc;
    size_t i;
	
	MPI_Init(&argc, &argv);
    MPI_Comm_size(MPI_COMM_WORLD, &nproc);
	MPI_Comm_rank(MPI_COMM_WORLD, &rank);
	MPI_Barrier(MPI_COMM_WORLD);
	
	double startTime = MPI_Wtime();
	//int partition=intervals/nproc;
	//int start=rank*partition;
	//int end=start+partition;
	sum = 0.0;
    dx = 1.0 / (double) intervals;
    for (i=rank+1; i<=intervals; i+=nproc) {
        x = dx * ((double) i - 0.5);
        sum += 4.0 / (1.0 + x*x);
    }
	mypi=dx*sum;
	MPI_Reduce(&mypi, &pi, 1, MPI_DOUBLE, MPI_SUM, 0, MPI_COMM_WORLD);
	MPI_Barrier(MPI_COMM_WORLD);
	double endTime = MPI_Wtime();
	if(rank==0){
		printf("Computed PI %.24f\n", pi);
		printf("The true PI %.24f\n\n", PI25DT);
		printf("Elapsed time (s) = %.2lf\n", endTime-startTime);
	}
	MPI_Finalize();
    return 0;
}