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

#SCHEMAS CREATION
participants_schema = StructType().add("participant_id", IntegerType())\
                                  .add("name", StringType())\
                                  .add("state", StringType())\
                                  .add("discipline", StringType())

results_schema = StructType().add("total_mentions", IntegerType())\
                             .add("total_followers", IntegerType())\
                             .add("total_medals", IntegerType())\
                             .add("year", IntegerType())\
                             .add("participant_id", IntegerType())

#DF LOAD
p_df = spark_session.read.schema(participants_schema)\
        .option("delimiter",";").csv("participants_dt.csv")

r_df = spark_session.read.schema(results_schema)\
        .option("delimiter",";").csv("results_ft.csv")


#QUERY EXECUTION
joined_df = p_df.join(r_df, on= p_df.participant_id==r_df.participant_id)

w = Window.partitionBy("name")\
          .orderBy("year")

joined_df.select("name","year",f.avg("total_mentions").over(w).alias("avg_mentions"))\
         .orderBy("name","year")\
         .show()
