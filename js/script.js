var links = ["http://vimeo.com/90299717", "http://www.youtube.com/watch?v=NUsoVlDFqZg",
				 "http://www.youtube.com/watch?v=0KSOMA3QBU0", "http://vimeo.com/93972085",
				 "http://www.youtube.com/watch?v=HkMNOlYcpHg", "http://www.youtube.com/watch?v=TGtWWb9emYI",
				 "http://www.youtube.com/watch?v=7-7knsP2n5w"]
	
//Ad link
var ad_link = "http://www.youtube.com/watch?v=EzDue9aeC0A"; 
	

//Generating and playing random video everytime page is loaded
var random_embed_link = select_random_video(links);
play_video(random_embed_link, ad_link);

for(var i=0; i<links.length; i++)
{
	var url_details = video_details(links[i]);
	var div = '<div class="thumb"><img src="' + url_details[1] + '" name="' + url_details[0] + '" video-src="' + url_details[2] + '" /></div>'

	$("#thumbnail").append(div);
}

//Changeing the playing video to the one clicked on
 $(".thumb img").click(function()
 {
 	var video_id = $(this).attr("name");
 	var video_source = $(this).attr("video-src");
 	var embed_link = create_embedded_link(video_id, video_source);
 	play_video(embed_link, ad_link);
 });


$("#add").click(function(){
	var url = document.getElementById("user_url").value;
	if(validate_url(url))
 	{
 		add_and_play_video(url);
 	}
 	else
	{
 		alert("Add Validate url from youtube and vimeo only");
 	}
 		
});
