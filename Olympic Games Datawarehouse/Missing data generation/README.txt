STEP 4: GENERATION OF THE REST OF THE DATA

The pairs.csv file is used by the generator.py file in order to produce the 2 sql scripts containing the inserts for followers and mentions (the 2 sql files included in this directory are samples of how the generated files should look, please note that running the script generator.py will produce different files each time since the values for followers and mentions are randomly generated).

NB: the pairs.csv file was obtained by exporting the result of the query "select distinct name,year from participants" in csv format.

