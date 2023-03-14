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
                             .add("discipline", StringType())

#DF LOAD
r_df = spark_session.read.schema(results_schema)\
        .option("delimiter",";").csv("results_per_discipline_ft.csv")


#QUERY EXECUTION
w = Window.partitionBy("discipline")

r_df.select("discipline","year","total_medals",f.sum(f.col("total_medals")).over(w).alias("totalmedals_ofalltime"))\
    .orderBy(f.desc("totalmedals_ofalltime"))\
    .show()
