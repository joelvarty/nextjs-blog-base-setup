import React from 'react'
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

// Import required actions and qualifiers.
import { fill } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { Gravity } from "@cloudinary/url-gen/qualifiers";
import { AutoFocus } from "@cloudinary/url-gen/qualifiers/autoFocus";

export default function CloudinaryVideo({ video }) {


	const videoObj = JSON.parse(video)


	// Create and configure your Cloudinary instance.
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'agility-cms'
		}
	});

	// Use the video with public ID
	const myVideo = cld.video(videoObj.public_id);

	// // Apply the transformation.
	// myVideo.resize(fill().width(150).height(150)
	// 	.gravity(Gravity.autoGravity().autoFocus(AutoFocus.focusOn(FocusOn.faces())))) // Crop the video, focusing on the faces.
	// 	.roundCorners(byRadius(20));    // Round the corners.

	// Render the transformed video in a React component.
	return (
		<AdvancedVideo cldVid={myVideo} controls className='rounded-lg' />
	)
};