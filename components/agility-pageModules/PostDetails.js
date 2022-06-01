import React from "react";
import { renderHTML } from "@agility/nextjs";
import { AgilityImage } from "@agility/nextjs"
import CloudinaryVideo from "components/common/CloudinaryVideo";
import CloudinaryImage from "components/common/CloudinaryImage";

const PostDetails = ({ dynamicPageItem }) => {
  // post fields
  const post = dynamicPageItem.fields;

  // category
  const category = post.category?.fields.title || "Uncategorized";

  // format date
  const dateStr = new Date(post.date).toLocaleDateString();

  const cloudinaryImage = post.cloudinaryImage || null

  return (
    <div className="relative px-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative flex justify-center ">
          {!cloudinaryImage &&
            <AgilityImage
              src={post.image.url}
              className="object-cover object-center rounded-lg"
              layout="fill"
            />
          }
          {cloudinaryImage &&
            <CloudinaryImage image={cloudinaryImage} />
          }
        </div>
        <div className="max-w-2xl mx-auto mt-4">
          <div className="text-xs font-bold leading-loose tracking-widest uppercase text-primary-500">
            {category}
          </div>
          <div className="w-8 border-b-2 border-primary-500"></div>
          <div className="mt-4 text-xs italic font-semibold text-gray-600 uppercase">
            {dateStr}
          </div>
          <h1 className="my-6 text-4xl font-bold font-display text-secondary-500">
            {post.title}
          </h1>
          {post.video &&
            <CloudinaryVideo video={post.video} />
          }
          <div
            className="max-w-full mb-20 prose"
            dangerouslySetInnerHTML={renderHTML(post.content)}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
