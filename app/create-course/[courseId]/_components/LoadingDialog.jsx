import React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const LoadingDialog = ({loading}) => {
  return (
     <AlertDialog open={loading}> {/*opening it based on the loading state and here we show the loading animation*/}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
           <div className="flex flex-col items-center py-10">
            <Image src={'/rocketLoading.gif'} width={100} height={100}/>
            <h2> Please Wait... Ai working on your course</h2>
           </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingDialog;
