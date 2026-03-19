import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from 'lucide-react'

export default function SideBar() {
  return (
<Sheet>
  <SheetTrigger>
          <Menu color='white' className='size-8'/>
    </SheetTrigger>
  <SheetContent showCloseButton={false}>
    <SheetHeader>
      <SheetTitle>Are you absolutely sure?</SheetTitle>
      <SheetDescription>This action cannot be undone.</SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}
