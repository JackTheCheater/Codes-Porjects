EXTRA STEP: SPARK SQL

The 5 sql scripts contained in this directory are the corresponding PySpark version of the 5 queries we discussed in the report, these scripts are also loaded under the home directory of "user_dw_2" onto the cluster.

The csv files contained in this directory are the extraction of our DW tables, without header, these files are also alreay loaded into the HDFS of "user_dw_2" onto the cluster and are present under its home directory too.

For running the scripts onto the cluster, we used the following command:
spark-submit --master local query1.py 2>/dev/null

(just substitute query1.py with another file name for running it instead of query1.py)