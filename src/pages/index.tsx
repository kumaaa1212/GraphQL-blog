import { request, gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import Link from 'next/link';
// ここで初期化
export const QUERY = gql`
{
  posts {
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
  }
}
`
export  interface CreatedBy{
  id:string;
}
export interface Html{
  html:string;
}
export interface Posts{
  id: string;
  title:string;
  datePublished:string;
  slug: string;
  content:Html,
  photo: CreatedBy;
}
export interface Props{
  posts:Posts[]
}
export interface Data{
  data:Posts[]
}

export default function Home({data}:Data) {
  return  (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-indigo-600 py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900">My Blog</h1>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((data: Posts) => (
            <div
              key={data.id}
              className="bg-white shadow-md p-4 rounded-lg hover:shadow-xl transition duration-300"
            >
              <Link href={`/${data.slug}`}>
                <span>
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{data.title}</h2>
                  <p className="text-gray-600">{data.datePublished}</p>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export async function getStaticProps() {
  const data:Props = await request('https://api-ap-northeast-1.hygraph.com/v2/clgvphora0uuc01uefl0l1adb/master',QUERY)
  return {
    props: {
      data:data.posts
    }, 
  }
}


