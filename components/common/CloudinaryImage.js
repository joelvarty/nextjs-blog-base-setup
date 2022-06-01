// 1. Import classes
// ==================

import React from 'react'
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";

// Import any actions required for transformations.
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function CloudinaryImage({ image }) {

	const imageObj = JSON.parse(image)
	let alt = "";
	if (imageObj.context && imageObj.context.custom && imageObj.context.custom.alt) {
		alt = imageObj.context.custom.alt
	}

	// 2. Set your cloud name
	//========================

	// Create a Cloudinary instance and set your cloud name.
	const cld = new Cloudinary({
		cloud: {
			cloudName: 'agility-cms'
		}
	});


	// 3. Get your image
	//===================

	// Instantiate a CloudinaryImage object for the image with the public ID, 'docs/models'.
	const myImage = cld.image(imageObj.public_id);


	// 4. Transform your image
	//=========================

	// Resize to 250 x 250 pixels using the 'fill' crop mode.
	myImage.resize(fill().width(800).height(400));


	// 5. Deliver your image
	// =========================

	// Render the image in a React component.
	return (
		<AdvancedImage cldImg={myImage} className='object-cover object-center rounded-lg' alt={alt} />
	)

};