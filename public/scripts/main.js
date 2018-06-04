console.log('main js connected')

// ==
//get button by id 
// ==
$(document).ready(function() {
	$('.modal').modal();
	
	$('#updateForm').on('submit', function(e){
		e.preventDefault();
		console.log("well the button is working at least")
		$.ajax({
			method: 'PUT',
			url:"/profile/edit",
			data:$(this).serialize(),
			success: updateSuccess,
			error: updateFail
		})
	})

	$('#commentForm').on('submit', function(e){
		e.preventDefault();
		console.log("comment form button worked")
		$.ajax({
			method: 'POST',
			url:'/show/'+$(this).attr('data-id'),
			data:$(this).serialize(),
			success: commentSuccess,
			error: commentFail
		}).then(function(data){
			console.log('hello')
		});
	})



	$( function() {
	    $( ".accordion" ).accordion({
	      collapsible: true
	    });
	  } );
	$(".navbar-toggler").click(function(){
	        $(".collapse").collapse('toggle');
	    });

	function updateSuccess(){
		console.log('this would send')
		window.location.href="/profile"
	}

	function updateFail(){
		console.log('this did not send...')
	}


	$('#deleteAccountButton').click(function(e){
		e.preventDefault();
		$.ajax({
			method: 'DELETE',
			url:"/profile/edit",
			data:$(this).serialize(),
			success: updateSuccess,
			error: updateFail
		})
	})

	function deleteSuccess(){
		console.log('this would delete')
		window.location.href="/"
	}

	function deleteFail(){
		console.log('this did not send...')
	}
	function commentSuccess(){
		console.log('this would post comment')
		window.location.href="/profile"
	}

	function commentFail(){
		console.log('this did not send a comment...')
	}

});

$(document).ready(function() {
	$('.modal').modal();
});
