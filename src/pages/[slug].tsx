import request, { gql } from 'graphql-request'
import React from 'react'
import { Posts, Props, QUERY } from '.';
interface Post{
  post:Posts
}
interface PostData{
  data:Posts
}
export const QUERYS = gql`
query Post($slug:String!){
  post(where:{slug:$slug}){
    id
    title
    datePublished
    slug
    content {
      html
    }
    photo {
      createdBy {
        id
      }
  }
}}
`
const Post = ({data}:PostData) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className=" text-3xl font-bold text-gray-900">My Blog</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-md p-4">
          <h2 className="text-4xl font-bold mb-4">{data.title}</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: data.content.html }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default Post


export async function getStaticProps({params}:any) {
  const variables = { slug: params.slug }; 
  const data:Post = await request('https://api-ap-northeast-1.hygraph.com/v2/clgvphora0uuc01uefl0l1adb/master',QUERYS, variables)
  return {
    props: {
      data:data.post
    }, 
  }
}

export async function getStaticPaths() {
  const data:Props = await request('https://api-ap-northeast-1.hygraph.com/v2/clgvphora0uuc01uefl0l1adb/master',QUERY)
  const paths = data.posts.map((data:Posts) =>{
    return { params: { slug: data.slug } }
  })
  return {
    paths:paths,
    fallback: false, 
  }
}