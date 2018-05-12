function getResponseFromServer(requestURL, params) {
	$.ajax({
		url: requestURL,
		type: "GET",
		dataType: "json",
		success: function(response, status, xhr) {
			return response;
		}
	});
};

function generateServiceURL(env) {
	var serviceURL;
	switch (env) {
		case "PROD":
			serviceURL = "";
			break;
		case "UAT":
			serviceURL = "";
			break;
		case "DEV":
			serviceURL = "";
			break;
		default:
			serviceURL = "";
			break;
	}
};

function generateRequestURL(serviceURL, esatType) {
	var requestURL;
	switch (esatType) {
		case "resource":
			requestURL = "";
			break;
		case "policy":
			requestURL = "";
			break;
		case "role":
			requestURL = "";
			break;
		default:
			requestURL = "";
			break;
	}
};

function generateParameters(userId) {
	return "userId=" + userId;
};