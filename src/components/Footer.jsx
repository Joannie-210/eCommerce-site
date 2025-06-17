import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer class="bg-[#D2691E] mt-20 text-white py-10">
  <div class="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    
  
    <div>
      <h2 class="text-xl font-bold mb-4">Luxestride</h2>
      <p class="text-sm text-white ">Elegance in every step. Discover premium fashion, footwear, and lifestyle essentials.</p>
    </div>
    
   
    <div>
      <h3 class="text-lg font-semibold mb-4">Shop</h3>
      <ul class="space-y-2 text-sm text-white   ">
        <li><a href="#" class="hover:text-underline">Women</a></li>
        <li><a href="#" class="hover:text-underline">Men</a></li>
        <li><a href="#" class="hover:text-underline">Accessories</a></li>
        <li><a href="#" class="hover:text-underline">New Arrivals</a></li>
      </ul>
    </div>

 
    <div>
      <h3 class="text-lg font-semibold mb-4">Help</h3>
      <ul class="space-y-2 text-sm text-white">
        <li><a href="#" class="hover:text-white">Shipping</a></li>
        <li><a href="#" class="hover:text-white">Returns</a></li>
        <li><a href="#" class="hover:text-white">FAQ</a></li>
        <li><a href="#" class="hover:text-white">Contact Us</a></li>
      </ul>
    </div>

 
    <div>
      <h3 class="text-lg font-semibold mb-4">Stay Updated</h3>
      <p class="text-sm mb-4">Join our newsletter for exclusive deals and updates.</p>
      <form class="flex">
        <input type="email" placeholder="Your email" class="w-full p-2 rounded-l bg-gray-300 text-black focus:outline-none"/>
        <button class="text-[#D2691E] bg-white px-4 py-2 font-bold rounded-r text-sm">Join</button>
      </form>
    </div>

  </div>

 
  <div class="border-t border-white mt-10 pt-6 text-center text-sm text-white">
    &copy; 2025 Luxestride. All rights reserved.
  </div>
</footer>
    </div>
  )
}

export default Footer
