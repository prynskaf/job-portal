import React from 'react'
import "./ApplyBtn.scss"
import Link from 'next/link'

const ApplyBtn = () => {
  return (
    <div>
      <button className="apply-button">
              <Link href="/jobs/apply">Apply now</Link>
     </button>
    </div>
  )
}

export default ApplyBtn
