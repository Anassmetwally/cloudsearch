# aws-cloudsearch
Upload, Delete and Search Amazon CloudSearch documents 


```
	var $search = require('dbk-elasticsearch')({
		endpoint: 'XXX.YYY.cloudsearch.amazonaws.com',
		accessKeyId: 'KKK',
		secretAccessKey: 'SSS',
		region: 'us-east-1',
	})

	$search.upload('id1', { field1: 'aaa', timestamp: 1, subject: 'Subject 1'}, function(err, data) {})
	$search.upload('id3', { field1: 'bbb', timestamp: 3, subject: 'Subject 3'}, function(err, data) {})
	$search.upload('id2', { field1: 'bbb', timestamp: 2, subject: 'Subject 2'}, function(err, data) {})

	$search.delete('id1', function(err, data) {})

	$search
		.find('subject')
		.filter('field1').eq("aaa")
		.order_by('timestamp')
		.desc()
		.skip(50)
		.limit(20)		
		.query(function(err, data) {})
```
