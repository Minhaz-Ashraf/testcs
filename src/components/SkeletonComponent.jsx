import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonComponent = () => {
  return (
   <>
    <section>
    <Skeleton duration={1} height={30} width={300} />
    </section>
   </>
  )
}

export default SkeletonComponent