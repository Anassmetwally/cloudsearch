
var AWS = require('aws-sdk')


function CloudSearchDomain($config) {
	this.csd = new AWS.CloudSearchDomain($config)
	
}
CloudSearchDomain.prototype.upload = function($id, $fields, cb ) {
	var params = {
	  contentType: 'application/json',
	  documents: JSON.stringify([{type: 'add', id: $id, fields: $fields },])
	}
	this.csd.uploadDocuments(params, function(err, data) {
		if (err) 
			return cb(err)

		cb( null, data )
	});
}
CloudSearchDomain.prototype.delete = function($id, cb ) {
	var params = {
	  contentType: 'application/json',
	  documents: JSON.stringify([{type: 'delete', id: $id },])
	}
	this.csd.uploadDocuments(params, function(err, data) {
		if (err) 
			return cb(err)

		cb( null, data )
	});
}

CloudSearchDomain.prototype.find = function( $text ) {
	return new CloudSearchDomainSearch(this.csd, $text)
}

function CloudSearchDomainSearch($csd, $text) {
	this.opts = {
		filter: [],
		sort: {
			field: '_score',
			direction: 'asc',
		},
		start: 0,	
		size: null,
	}
	this.csd = $csd
	this.pendingFilter = null
	this.opts.query = $text
	return this
}
CloudSearchDomainSearch.prototype.filter = function( $key ) {
	this.pendingFilter = $key
	return this
}
CloudSearchDomainSearch.prototype.eq = function($val) {
	this.opts.filter.push({
		key: this.pendingFilter,
		op: ':',
		val: $val
	})
	return this
}
CloudSearchDomainSearch.prototype.desc = function() {
	this.opts.sort.direction = 'desc'
	return this
}
CloudSearchDomainSearch.prototype.asc = function() {
	this.opts.sort.direction = 'asc'
	return this
}
CloudSearchDomainSearch.prototype.order_by = function($field) {
	this.opts.sort.field = $field
	return this
}
CloudSearchDomainSearch.prototype.limit = function($number) {
	this.opts.size = $number
	return this
}
CloudSearchDomainSearch.prototype.skip = function($number) {
	this.opts.start = $number
	return this
}
CloudSearchDomainSearch.prototype.query = function(cb) {
	var params = {
		query: this.opts.query, 
		//cursor: 'initial',
		//expr: 'STRING_VALUE',
		//facet: 'STRING_VALUE',
		//highlight: 'STRING_VALUE',
		//partial: true || false,
		//queryOptions: 'STRING_VALUE',
		queryParser: 'simple', // simple | structured | lucene | dismax',
		//return: 'STRING_VALUE',
		sort: this.opts.sort.field + ' ' + this.opts.sort.direction,
	}
	
	if (this.opts.filter.length) {
		params['filterQuery'] = this.opts.filter[0].key + this.opts.filter[0].op + "'" + this.opts.filter[0].val + "'"
	}
	if (this.opts.size !== null)
		params['size'] = this.opts.size

	if (this.opts.start)
		params['start'] = this.opts.start

	this.csd.search(params, function(err, data) {
		if (err) 
			return cb(err)

		var $ret = {}
		for (var i in data.hits.hit) {
			var $item = {}
			for (var j in data.hits.hit[i].fields )
				$item[j] = data.hits.hit[i].fields[j][0]

			$ret[data.hits.hit[i].id] = $item
		}
		cb(null, $ret, data) 
	})
}
module.exports = function($config) {
	return new CloudSearchDomain($config)
}