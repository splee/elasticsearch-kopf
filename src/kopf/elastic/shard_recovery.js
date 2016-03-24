function ShardRecovery(indexName, shardInfo) {
  var pad = function(num) {
    var numStr = '0' + num;
    return numStr.slice(-2);
  };

  var humanDuration = function(duration) {
    duration = duration / 1000;
    var hours = Math.floor(duration / 3600);
    var hrsRemainder = duration % 3600;
    var minutes = Math.floor(hrsRemainder / 60);
    var seconds = Math.floor(hrsRemainder % 60);

    return hours + ':' + pad(minutes) + ':' + pad(seconds);
  };

  this.shardInfo = shardInfo;

  this.indexName = indexName;
  this.id = shardInfo.id;
  this.type = shardInfo.type;
  this.primary = shardInfo.primary;
  this.stage = shardInfo.stage;
  this.start_time_in_millis = shardInfo.start_time_in_millis;
  this.started = new Date(this.start_time_in_millis);
  this.total_time_in_millis = shardInfo.total_time_in_millis;
  this.duration = humanDuration(this.total_time_in_millis);

  this.target = shardInfo.target;
  this.source = shardInfo.source;

  this.index = shardInfo.index;
  this.index.duration = humanDuration(this.index.total_time_in_millis);

  this.verify_index = shardInfo.verify_index;
  this.verify_index.duration = humanDuration(
      this.verify_index.total_time_in_millis
  );

  this.translog = shardInfo.translog;
  this.translog.duration = humanDuration(this.translog.total_time_in_millis);
}
