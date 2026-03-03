import Image from "next/image";
import Link from "next/link";
// logos
import Logo from "@/public/logo/white-on-black.svg";
// icons
import ArrowTopRight from "@/public/icons/arrow-top.svg";
import FacebookIcon from "@/public/icons/facebook.svg";
import InstagramIcon from "@/public/icons/instagram.svg";

export default function Footer() {
  return (
    <footer className="w-screen max-w-[1608px] mx-auto flex flex-col items-center justify-start mt-10 p-5 lg:p-10 gap-8 lg:gap-12">
      {/* Top Section: Logo and Contact */}
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:gap-4">
        <Image src={Logo} alt="DOT Media Group Logo" width={130} height={60} />
        <div className="flex items-center justify-center lg:justify-between lg:w-auto py-4 border-b border-neutral-700">
          <p className="text-[16px] lg:text-[18px] text-neutral-300 font-jakarta font-normal tracking-[-0.36px]">hello@dotmedia.group</p>
          <Image src={ArrowTopRight} alt="Arrow Icon" width={16} height={16} className="ml-4" />
        </div>
      </div>

      {/* Middle Section: Navigation and Social Links */}
      <div className="w-full flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-0">
        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 text-sm">
          <Link href="/" className="text-neutral-500 hover:text-neutral-300 font-jakarta font-normal transition-colors duration-200">Home</Link>
          <Link href="/services" className="text-neutral-500 hover:text-neutral-300 font-jakarta font-normal transition-colors duration-200">Services</Link>
          <Link href="/work" className="text-neutral-500 hover:text-neutral-300 font-jakarta font-normal transition-colors duration-200">Case Studies</Link>
          <Link href="/#project-request" className="text-neutral-500 hover:text-neutral-300 font-jakarta font-normal transition-colors duration-200">Project Request</Link>
          <Link href="/contact" className="text-neutral-500 hover:text-neutral-300 font-jakarta font-normal transition-colors duration-200">Contact us</Link>
        </div>

        {/* Social Media Links */}
        <div className="flex items-center gap-6">
          <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-300 transition-colors duration-200">
            <Image src={FacebookIcon} alt="Facebook" width={32} height={32} className="hover:scale-110 transition-transform" />
          </Link>
          <Link href="https://www.instagram.com/dotmg.eu/" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-neutral-300 transition-colors duration-200">
            <Image src={InstagramIcon} alt="Instagram" width={32} height={32} className="hover:scale-110 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-neutral-800 to-transparent"></div>

      {/* Bottom Section: Copyright and Policies */}
      <div className="w-full flex items-center justify-between gap-4 p-4">
        <p className="text-[12px] lg:text-[13px] text-neutral-500 font-jakarta font-normal">© 2026 Dot Media Group</p>
        <div className="flex gap-6 text-[12px] lg:text-[13px]">
          <Link href="#cookies" className="text-neutral-500 hover:text-neutral-400 font-jakarta font-normal transition-colors duration-200">Cookie & Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
