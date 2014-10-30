	/***************************************************************************************
 	  Playing video i.e changin the iframe source and reloading it
 	****************************************************************************************/
 	function play_video(embed_link, ad_link, ad_time)
 	{
 		var ad_video_id = get_youtube_video_id(ad_link);
		var ad_embed_link = create_embedded_link(ad_video_id, "youtube");
		var ad_time = youtube_video_duration(ad_link);

		//playing ad
		$("#vdo").attr("src", ad_embed_link);
 		$("iframe").load()

 		//Clearing any setTimeout and playing video after ad is completed
 		clearTimeout(timeouts);

 		timeouts = setTimeout(function(){
 			$("#vdo").attr("src", embed_link);
 			$("iframe").load()
 		}, ad_time);
 	}

	/***************************************************************************************
 	  Get duration of youtube videos in milli seconds
 	****************************************************************************************/
 	function youtube_video_duration(url)
 	{
 		var video_id = get_youtube_video_id(url);
 		var json_url = 'http://gdata.youtube.com/feeds/api/videos/' + video_id + '?v=2&alt=jsonc'
		var result, duration;

		$.ajax(
 		{
 			url: json_url,
 			async: false,
 			success: function(data)
 			{
 				result = data.data;
 			}
 		});

 		duration = result.duration*1000;

 		return duration;
 	}

 	/***************************************************************************************
 	  Validate if url you are trying to add is valid youtube and vimeo url
 	****************************************************************************************/
 	function validate_url(url)
 	{
 		var youtube_regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
 		var vimeo_regExp = /^(http\:\/\/|https\:\/\/)?(www\.)?(vimeo\.com\/)([0-9]+)$/;
	    if(url.match(youtube_regExp) || url.match(vimeo_regExp))
		    return true;

		return false;
 	}
 	/***************************************************************************************
 	  Add or append new video to the sidebar and play the newly added video
 	****************************************************************************************/
 	function add_and_play_video(url)
 	{
 		var url_details = video_details(url);
		var div = '<div class="thumb"><img src="' + url_details[1] + '" name="' + url_details[0] + '" video-src="' + url_details[2] + '" /></div>'
		$("#thumbnail").append(div);

		var embed_link = create_embedded_link(url_details[0], url_details[2]);
		play_video(embed_link, ad_link);
 	}

 	/***************************************************************************************
 	  Create Embedded link from regular video url for embedding it to to the video container 
 	****************************************************************************************/
 	function create_embedded_link(video_id, source)
 	{
 		var url = "";

 		if(source=="youtube")
 		{
 			url = "http://www.youtube.com/embed/" + video_id + "?rel=0&autoplay=1";
 		}
 		else if(source=="vimeo")
 		{
 			url = "http://player.vimeo.com/video/" + video_id + "?autoplay=1";
 		}
 		return url;
 	}

 	/***************************************************************************************
 	  Using regular expressing extracting video id of youtube video from its url
 	****************************************************************************************/
 	function get_youtube_video_id(url)
 	{
 		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	    var match = url.match(regExp);

	    if(match&&match[7].length==11)
	    {
	        return match[7];
	    }
	    else
	    {
	        alert("URL incorrect!");
	    }
 	}

 	/***************************************************************************************
 	  obtaining thumbnail and video id of video from vimeo video url (using vimeo api) 
 	****************************************************************************************/
 	function get_vimeo_video_id_and_thumb(url)
 	{
 		var json_url = "http://vimeo.com/api/oembed.json?url=" + url;
 		var result;
 		var vdo_details = {};

 		$.ajax(
 		{
 			url: json_url,
 			async: false,
 			success: function(data)
 			{
 				result = data;
 			}
 		});

 		vdo_details.video_id = result.video_id;
 		vdo_details.thumb =  result.thumbnail_url;

 		return vdo_details;
 	}

 	/***************************************************************************************
 	  Idetyfying source of video whether its youtube or vimeo from video url
 	****************************************************************************************/
 	function identify_video_source(url)
 	{
 		var video_source = "";
 		if(url.toLowerCase().indexOf("youtube.com") >= 0)
 			video_source = "youtube";
 		else if(url.toLowerCase().indexOf("vimeo.com") >= 0)
 			video_source = "vimeo";

 		return video_source;
 	}

 	/***************************************************************************************
 	  Creating thumbnail url for any youtube video with its Video Id
 	****************************************************************************************/
 	function get_youtube_thumbnail(video_id)
 	{
 		var img_url = "http://img.youtube.com/vi/" + video_id + "/0.jpg";
 		return img_url;
 	}
 	
 	/***************************************************************************************
 	  Using all the created functions identifying video source, obtaining the thumbnail image, and 
 	  video id from the url of video and returning it as an array
 	****************************************************************************************/
 	function video_details(url)
 	{
 		var src = identify_video_source(url);
 		var details = [];
 		if(src=="youtube")
 		{
 			var id = get_youtube_video_id(url);
 			var thumb = get_youtube_thumbnail(id);
 			details = [id, thumb, src]; 
 		}
 		else if(src=="vimeo")
 		{
 			var vimeo_details = get_vimeo_video_id_and_thumb(url);
 			details = [vimeo_details.video_id, vimeo_details.thumb, src]; 		
 		}
 		return details;
 	}

 	/**************************************************************************
 	  Selecting random video from array of url's and creating its embedded link
 	***************************************************************************/
 	function select_random_video(url_arr)
 	{	
 		var random = Math.ceil(Math.random() * url_arr.length) - 1;
 		var details = video_details(url_arr[random]);
 		var embed_link = create_embedded_link(details[0], details[2]);
 		return embed_link;
 	}
 	