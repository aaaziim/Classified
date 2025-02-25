 
import { MdOutlineDateRange } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import { FaLocationArrow } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import SellerInfo from './SellerInfo';
import CategorySidebar from './CategorySidebar';
import { Helmet } from 'react-helmet-async';
const EventDetails = () => {
  return (
    <>
   <Helmet>
                          <title>Event Details</title>
          </Helmet>
          <div className='flex flex-col justify-center md:flex-row gap-4 my-10'>
       
       <div className='w-full md:2/3 bg-gray-200 p-4 space-y-4 rounded-2xl '>
           <img className='w-full h-96' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2z-Qg3pe-RY9Lv8kQ4Ik3uFlebhYk4I9R0Q&s" alt="" />
       <div className='flex justify-between gap-4'> 
           <div className="flex gap-4">
           <p className='flex items-center gap-2'><span><MdOutlineDateRange /></span> <span>Start: 12,12,2025</span></p>
           <p className='flex items-center gap-2'><span><MdOutlineDateRange /></span> <span>Ends:12,12,2025</span></p>
           </div>
           <p 
 className="bg-red-500 max-w-fit px-4 py-2 text-white font-bold relative"
 style={{ clipPath: "polygon(0 0, 100% 0, 90% 50%, 100% 100%, 0 100%)" }}
>Price: $220</p> </div>
       <div className='grid grid-cols-2 gap-4'> 
 

       <p className='flex items-center gap-2'>
           <span> <FaLocationArrow /></span> <span>State: Dhaka </span>
      </p>
       <p className='flex items-center gap-2'>
           <span> <IoLocationOutline /></span> <span> City: Barishal</span>
      </p>
           <p className='flex items-center gap-2'>
           <span><BiCategoryAlt /> </span> <span>Category: Service </span>
           </p>
           <p className='flex items-center gap-2'>
           <span><MdCategory /> </span> <span> SubCategory: Welbeing</span>
           </p>
      </div>
       
    
<p className='text-2xl font-semibold text-left'>Description:</p>
<p className='text-xl text-justify'>
Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis quaerat ducimus quidem. Adipisci incidunt ipsam officiis, earum suscipit aut accusamus, id sit recusandae, harum minima vero nostrum neque dolores ex perferendis est nam eius? Distinctio quisquam delectus laboriosam, velit maiores, fugiat perferendis voluptas praesentium vel alias saepe libero eligendi nulla, dicta corporis illum quaerat unde minus explicabo exercitationem recusandae ut dignissimos sed officia. Molestiae repellendus, ratione minus provident quod quae vitae omnis consectetur ex modi, ipsa dolorem quo illo praesentium laudantium. Quae, quia? Voluptas vel error asperiores corporis nemo necessitatibus? Quaerat explicabo possimus corporis necessitatibus cumque repellat ducimus, minus quas dicta, pariatur at praesentium cum corrupti officiis nobis earum id provident illum repellendus laborum neque deleniti. Tenetur, accusamus eum reprehenderit sapiente optio sed sit tempore, in asperiores ea ullam, quas officiis id facere quidem dolores debitis placeat dicta iusto maiores perspiciatis. Facere ducimus consequatur, vero culpa aliquam odit, aut molestiae eos quis quo dicta nisi excepturi asperiores officia beatae magni rerum ratione maxime illum. Debitis delectus consequuntur, nobis aliquam tempora nostrum optio earum illo illum atque voluptatibus iusto voluptas velit laudantium iure tenetur, autem tempore, modi repellendus vel ut nihil harum? Aperiam harum autem incidunt accusamus minus at ipsam, ut suscipit reiciendis nulla? Placeat, odit deserunt. Molestias modi ab magnam enim ducimus. Nesciunt dolores id obcaecati repellat cumque, molestiae ducimus quas minus expedita consequuntur ea alias perferendis sed amet corporis maiores aliquid. Totam ab minus inventore provident autem sint delectus fugiat cupiditate consequatur, sequi fuga? Nam molestias dignissimos adipisci veritatis in vero nobis? Dolores nobis illum quod error unde aliquid, dolore natus, facilis sequi neque, minima mollitia officiis doloremque dicta. Omnis, harum commodi quod libero iusto fugiat voluptatem maiores quasi ipsa dolor impedit blanditiis, atque enim ipsam autem nobis perferendis! Ea fugiat magnam possimus est explicabo aliquam voluptatem sint provident.
</p>


       </div>
      <div className='space-y-10 w-full md:w-1/3'>
      <SellerInfo></SellerInfo>
      <CategorySidebar></CategorySidebar>
      </div>
     
   </div>
  </>
   
  )
}

export default EventDetails
