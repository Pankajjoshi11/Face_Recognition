import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
  } from "@/components/ui/dropdown-menu";
  import options from '../assets/images/success/options.png';
  
  const RightDropdown = () => {
    return (
      <div className="relative text-white flex-col">
        <div className="absolute top-0 m-2 p-2 right-0">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <img src={options} 
                   alt="Right Dropdown" 
                   className="w-auto h-10" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-customBlue text-white mr-4">
              <DropdownMenuItem>Attendance History</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="hover:text-black active:text-black focus:text-black">Help</DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="bg-customBlue text-white ml-4">
                  <DropdownMenuItem>Face not detected</DropdownMenuItem>
                  <DropdownMenuItem>Face and details differ</DropdownMenuItem>
                  <DropdownMenuItem>New User</DropdownMenuItem>
                  <DropdownMenuItem>Others</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    );
  };
  
  export default RightDropdown;
  