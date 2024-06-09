import React from 'react'
import { Image } from "@nextui-org/react";
import Profile1 from './Profile1';
import { Card, CardHeader, CardFooter, Avatar, Button } from "@nextui-org/react";

const Posts = () => {
    const [isFollowed, setIsFollowed] = React.useState(false);
    return (
          
          <div className='relative flex flex-col border border-black-500 w-[40%]  justify-center items-center'>
              <div className='absolute top-2 w-full flex justify-center '>
                <Profile1/>
              </div>
            <Card className="max-w-[340px]">
              <CardHeader className="justify-between">
                <div className="flex gap-5 mt-5">
                  <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
                  <div className="flex flex-col gap-1 items-start justify-center">
                    <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
                    <h5 className="text-small tracking-tight text-default-400">@zoeylang</h5>
                  </div>
                </div>
                <Button
                  className={isFollowed ? 
                    "bg-transparent text-foreground border-default-200 " :
                    "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30 text-white"}
                  radius="full"
                  size="sm"
                  variant={isFollowed ? "bordered" : "solid"}
                  onPress={() => setIsFollowed(!isFollowed)}
                >
                  {isFollowed ? "Unfollow" : "Follow"}
                </Button>
              </CardHeader>
              <Image
                width={300}
                alt="NextUI hero Image"
                src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
              /> 
              <CardFooter className="gap-3">
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">4</p>
                  <p className="text-default-400 text-small">Following</p>
                </div>
                <div className="flex gap-1">
                  <p className="font-semibold text-default-400 text-small">97.1K</p>
                  <p className="text-default-400 text-small">Followers</p>
                </div>
              </CardFooter>
            </Card>
          </div>
     
      );
}

export default Posts
