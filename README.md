# sort-demo
how to sort



```
CREATE TABLE `bitmap_uv` (
  `table` varchar(200) NULL COMMENT "表",
  `attribute` varchar(200) NULL COMMENT "字段",
  `value` varchar(500) NULL COMMENT "值",
  `time` datetime NULL COMMENT "时间",
  `user_id` bitmap BITMAP_UNION NULL COMMENT "用户ID"
) ENGINE=OLAP
AGGREGATE KEY(`table`, `attribute`, `value`, `time`)
COMMENT "OLAP"
PARTITION BY RANGE(`time`)
(PARTITION g1 VALUES [('0000-01-01 00:00:00'), ('2020-01-01 00:00:00')),
PARTITION g2 VALUES [('2020-01-01 00:00:00'), ('2020-02-01 00:00:00')))
DISTRIBUTED BY HASH(`table`, `attribute`, `value`) BUCKETS 10
PROPERTIES (
"replication_num" = "3",
"dynamic_partition.enable" = "true",
"dynamic_partition.time_unit" = "MONTH",
"dynamic_partition.start" = "-2147483648",
"dynamic_partition.end" = "1",
"dynamic_partition.prefix" = "p",
"dynamic_partition.buckets" = "10",
"dynamic_partition.start_day_of_month" = "1",
"in_memory" = "false",
"storage_format" = "DEFAULT"
);
```
```
public void insertDorisData(DorisModel dorisModel) {

        final String loadUrl = String.format("http://%s:%s/api/%s/%s/_stream_load",
                getHost(), DORIS_HTTP_PORT, this.dorisDb, "bitmap_uv");

        Map<String, String> headers = Maps.newHashMap();
        headers.put(HttpHeaders.EXPECT, "100-continue");
        headers.put(HttpHeaders.AUTHORIZATION, basicAuthHeader(dorisUser, this.dorisPassword));
        headers.put("column_separator", DorisConstant.SPLIT);
        headers.put("columns", "table,attribute,value,time,user_id=to_bitmap(user_id)");

        Response response = FastHttpClient.newBuilder()
                .addInterceptor(new RedirectInterceptor()).build().put()
                .url(loadUrl)
                .addHeaders(headers)
                .body(dorisModel.getValue())
                .build().execute();

        String loadResult = response.string();

        final boolean isSuccessful = response.isSuccessful();

        DorisResult dorisResult = convertToDorisResult(loadResult);

        if (!isSuccessful || isFailForDorisImporting(dorisResult)) {
            log.error("doris返回结果:[{}]", dorisResult.toString());
            throw new DataWorksException(String.format("Stream load failed, isSuccessful=%s load result=%s",
                    isSuccessful, dorisResult.toString()));
        }

    }
    ```
