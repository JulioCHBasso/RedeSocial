
import Post from "./Post"

interface IPost {
    id: number,
    post_desc: string,
    img: string,
    username: string,
    user_img: string,
    created_at: string,
    userId: number

}

function Feed(props: { post: IPost[] | undefined }) {



    return (
        <div className="flex flex-col items-center gap-5 w-full">

            <div className=" w-full flex flex-col gap-5 items-center ">{
                props.post?.map((post, id) => {
                    return <Post post={post} key={id} />
                })
            }</div>




        </div>

    );
}
export default Feed;