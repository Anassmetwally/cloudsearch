# aws-cloudsearch
Upload, Delete and Search Amazon CloudSearch documents 


```
	var $mailsearch = require('dbk-elasticsearch')({
		endpoint: 'XXXXXXXXXXXXXXXXXXXX.YYYYYYYY.cloudsearch.amazonaws.com',
		accessKeyId: 'KKKKKKKKKKKKKKKKKKKKKKKKKK',
		secretAccessKey: 'SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS',
		region: 'us-east-1',
	})

	$mailsearch.upload('id1', { field1: 'aaa', timestamp: 1, subject: 'Subject 1'}, function(err, data) {})
	$mailsearch.upload('id3', { field1: 'bbb', timestamp: 3, subject: 'Subject 3'}, function(err, data) {})
	$mailsearch.upload('id2', { field1: 'bbb', timestamp: 2, subject: 'Subject 2'}, function(err, data) {})

	$mailsearch.delete('id1', function(err, data) {})

	$mailsearch.find('subject').filter('field1').eq("aaa").query(function(err, data) {})
```
