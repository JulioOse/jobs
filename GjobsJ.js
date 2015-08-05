$(document).ready(function() {
	/* Search function   */
	$('.searchB').click(function() {
		var active = false;
		$('.content').html('')
		$('.numJobs').html('')
		$('.footer').html('')
		var baseUrl = 'https://data.usajobs.gov/api/jobs?'
		if($('input[name="jobT"]').val() != '') {
			active = true;
			var $title = $('input[name="jobT"]').val().split(' ');
			var arrayT = [];
			for(x in $title) {
				arrayT.push($title[x] + '%20')
			}
			var stringT = arrayT.join('');
			stringT = stringT.slice(0, -3);
			baseUrl = baseUrl + 'Title=' + stringT
		}
		
		if($('input[name="jobL"]').val() != '') {
			var $location = $('input[name="jobL"]').val().split(' ');
			var arrayL = [];
			for(x in $location) {
				arrayL.push($location[x] + '%20')
			}
			var stringL = arrayL.join('');
			stringL = stringL.slice(0, -3);
			if(active === true) {
				baseUrl = baseUrl+ '&' + 'LocationName=' + stringL
			}
			else {
				baseUrl = baseUrl + 'LocationName=' + stringL
			}
		   
		}
		/* API get request and add data to html document    */
		$.ajax({
		type: 'GET',
		url: baseUrl,
		crossDomain: true,
	    dataType: 'jsonp',
		success: function(data) {
			if(data["TotalJobs"] === "0" || data['TotalJobs'] === null) {
			  $('.content').append('<h2 style="text-align: center">No Results Found</h2>')
		  }
			else { 
			$('.numJobs').append('<h3>Total Jobs ' + data["TotalJobs"] + '</h3>')
			 for(var currentObj in data['JobData'] ) {
				var htmlRe = '<strong>Job Title:</strong> <em style="text-decoration: underline">' + data["JobData"][currentObj]["JobTitle"] + '</em><br>';
				htmlRe = htmlRe + '<strong>Organization name:</strong> ' + data["JobData"][currentObj]["OrganizationName"] + '<br>';
				htmlRe = htmlRe + '<strong>salary:</strong> ' + data["JobData"][currentObj]["SalaryMin"] + ' - ' + data["JobData"][currentObj]["SalaryMax"] + '<br>' 
				htmlRe = htmlRe + '<strong>Start Date:</strong> ' + data["JobData"][currentObj]["StartDate"] + '<br>';
				htmlRe = htmlRe + '<strong>Work Schedule:</strong> ' + data["JobData"][currentObj]["WorkSchedule"] + '<br>';
				htmlRe = htmlRe + '<strong>Locations:</strong>' + data["JobData"][currentObj]["Locations"] + '<br>';
				htmlRe = htmlRe + '<strong>Job Summary:</strong> ' + data["JobData"][currentObj]["JobSummary"] + '<br>';
				htmlRe = htmlRe + '<a href=' + data["JobData"][currentObj]["ApplyOnlineURL"] + ' target="_blank">Apply online' + '</a>' + '<br>';
				$('.content').append('<div class="contentObj">' + htmlRe + '</div>')
			} 
			$('.footer').append('<a href="#top" style="text-align: center"><h3>Back To Top</h3></a>')
		  } 
		} 
		})
	})
})
