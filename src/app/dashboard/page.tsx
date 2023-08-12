import { FC } from 'react';
import Link from 'next/link';

interface pageProps { };

const page: FC<pageProps> = ({ }) => {
    return (
        <>
            <div> This is dashboard. </div>
            <Link href={"/api/auth/signout"}>Sign out</Link>
        </>
    )
}

export default page;