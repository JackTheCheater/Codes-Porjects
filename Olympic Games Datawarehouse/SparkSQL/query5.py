from pyspark.sql import SparkSession
from pyspark.sql.types import *
from pyspark.sql.window import Window
import pyspark.sql.functions as f
import time

spark_session = SparkSession.builder\
                            .enableHiveSupport()\
                            .appName("spark_sql")\
                            .master("local")\
                            .getOrCreate()

#SCHEMA CREATION
results_schema = StructType().add("total_mentions", IntegerType())\
                             .add("total_followers", IntegerType())\
                             .add("total_medals", IntegerType())\
                             .add("year", IntegerType())\
                             .add("state", StringType())

#DF LOAD
r_df = spark_session.read.schema(results_schema)\
        .option("delimiter",";").csv("results_per_state_ft.csv")


#QUERY EXECUTION
w = Window.partitionBy("state")\
          .orderBy("year")\
          .rowsBetween(-1,Window.currentRow)

r_df.select("state","year",f.avg("total_mentions").over(w).alias("mobile_mentions"))\
       .orderBy("state","year")\
       .show()
