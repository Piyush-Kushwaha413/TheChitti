import React from 'react'
import { toaster } from "@/components/ui/toaster"

const Toster = () => {
    toaster.success({
        title: "Update successful",
        description: "File saved successfully to the server",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        }})
    return (
        <></>
  )
}

export default Toster