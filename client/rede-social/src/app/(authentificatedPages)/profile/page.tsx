'use client'
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../../../axios'
import Feed from '@/components/Feed';

interface IPost {
    id: number,
    post_desc: string,
    img: string,
    username: string,
    user_img: string,
    created_at: string,
    userId: number

}

function Profile({ searchParams }: { searchParams: { id: string } }) {
    const profileQuery = useQuery({
        queryKey: ['profile', searchParams.id],
        queryFn: () => makeRequest.get('users/get-user?id=' + searchParams.id).then((res) => {
            return res.data[0]
        })
    })
    if (profileQuery.error) {
        console.log(profileQuery.error)
    }
    
   

    const postQuery = useQuery<IPost[] | undefined>({
        queryKey: ['posts'],
        queryFn: () =>
            makeRequest.get("post/?id=" +searchParams.id).then((res) => {
                return res.data.data;
            })
    })

    if (postQuery.error) {
        console.debug(postQuery.error);
    }

    return( 
    <div className="w-3/5 flex flex-col itens center">
        <div className="relative">
            <img className= "rounded-xl" 
            src={profileQuery.data?.bgImg ?profileQuery.data.bgImg : 'https://cdn-icons-png.flaticon.com/512/1695/1695213.png'} alt="" />

            <div className="flex absolute bottom-[-110px] left-10 items-center ">
                <img className="w-40 h-40 rounded-full border-zin-100 border-4" src={profileQuery.data.userImg ? profileQuery.data.userImg : "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png"
                } alt="" />
                <span className="text-2xl font-bold pl-2">{profileQuery.data?.username}</span>
            </div>
        </div>
    </div>
    <div className="pt-36 w-3/5">
    <Feed post={postQuery.data}/>
    </div>
    
    );


}

export default Profile;