import React from "react";
import Link from "next/link";
import truncate from "truncate-html";
import { AgilityImage } from "@agility/nextjs"

const FeaturedPostCarousel = ({ module, customData }) => {
	// get module fields
	const { fields } = module;

	// get featured post
	const { featuredPost: posts } = fields;



	// // convert date
	// const dateStr = new Date(featuredPost?.fields.date).toLocaleDateString();

	// // truncate post content
	// const description = truncate(featuredPost?.fields.content, {
	// 	length: 160,
	// 	decodeEntities: true,
	// 	stripTags: true,
	// 	reserveLastWord: true,
	// });


	return (
		<div>
			{posts.map((featuredPost) => {
				return (
					<div key={featuredPost.contentID} className="relative px-8 mb-8">
						<div className="flex flex-col max-w-screen-xl pt-8 mx-auto sm:flex-row group">
							<div className="relative sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg">
								<Link href={`/blog/${featuredPost.fields.slug}`}>
									<a className="cursor-pointer">
										<div className="relative h-64 sm:h-96">
											<AgilityImage
												src={featuredPost.fields.image.url}
												className="object-cover object-center rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
												layout="fill"
											/>
										</div>
									</a>
								</Link>
							</div>
							<div className="relative p-8 bg-gray-100 border-2 border-t-0 rounded-b-lg sm:w-1/2 lg:w-1/3 sm:rounded-bl-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0">
								<Link href={`/blog/${featuredPost.fields.slug}`}>
									<a className="cursor-pointer">
										<div className="text-xs font-bold leading-loose tracking-widest uppercase font-display text-primary-500 after:content">
											{featuredPost.fields.category.fields.title}
										</div>
										<div className="w-8 border-b-2 border-primary-500"></div>
										{/* <div className="mt-4 text-xs italic font-semibold text-gray-600 uppercase">
											{dateStr}
										</div> */}
										<h2 className="mt-1 text-2xl font-black transition duration-300 font-display text-secondary-500 group-hover:text-primary-500">
											{featuredPost.fields.title}
										</h2>
										{/* <p className="mt-3 text-sm font-medium leading-loose text-gray-600">
											{description}
										</p> */}
									</a>
								</Link>
							</div>
						</div>
					</div>
				)
			})
			}
		</div>
	);
};


// function to resole post urls
const resolvePostUrls = function (sitemap, posts) {
	let dynamicUrls = {};
	posts.forEach((post) => {
		Object.keys(sitemap).forEach((path) => {
			if (sitemap[path].contentID === post.contentID) {
				dynamicUrls[post.contentID] = path;
			}
		});
	});
	return dynamicUrls;
};

FeaturedPostCarousel.getCustomInitialProps = async ({
	agility,
	channelName,
	languageCode,
}) => {
	// set up api
	const api = agility;

	try {
		// get sitemap...
		let sitemap = await api.getSitemapFlat({
			channelName: channelName,
			languageCode,
		});

		// get posts...
		let rawPosts = await api.getContentList({
			referenceName: "posts",
			languageCode,
			contentLinkDepth: 2,
			depth: 2,
			take: 5,
			sort: "properties.modified",
			sortDirection: "desc"
		});

		// resolve dynamic urls
		const dynamicUrls = resolvePostUrls(sitemap, rawPosts.items);

		const posts = rawPosts.items.map((post) => {
			//category
			const category = post.fields.category?.fields.title || "Uncategorized"

			// date
			const date = new Date(post.fields.date).toLocaleDateString();

			// url
			const url = dynamicUrls[post.contentID] || "#";

			// post image src
			let imageSrc = post.fields.image.url;

			// post image alt
			let imageAlt = post.fields.image?.label || null;

			return {
				contentID: post.contentID,
				title: post.fields.title,
				date,
				url,
				category,
				imageSrc,
				imageAlt,
			};
		});

		return {
			posts,
		};
	} catch (error) {
		if (console) console.error(error);
	}
};



export default FeaturedPostCarousel;
