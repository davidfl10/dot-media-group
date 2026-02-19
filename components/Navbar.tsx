import useWindowWidth from '@/lib/useWindowWidth';
import Logo from '@/public/logo/white-on-black.svg';
import Image from 'next/image';
import Link from 'next/link';
// components
import StaggeredMenu from './menu/StagerredMenu';

const Navbar = () => {
  const width = useWindowWidth();
  const logoWidth = width && width > 850 ? 110 : 82;
  const logoHeight = width && width > 850 ? 40 : 25;

  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Work', ariaLabel: 'Learn about us', link: '/work' },
    { label: 'Services', ariaLabel: 'View our services', link: '/' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/' }
  ];

  return (
    <>
      {width && width < 750 ? (
        <div className='h-screen w-screen'>
          <StaggeredMenu
            isFixed={true}
            position="right"
            items={menuItems}
            displaySocials
            displayItemNumbering={false}
            menuButtonColor="#ffffff"
            openMenuButtonColor="#fff"
            changeMenuColorOnOpen={true}
            colors={['#32323B', '#0e0e0eb3']}
            accentColor="#32323B"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
          />
        </div>
      ) : (
        <div className='inline-flex p-3 items-center justify-between lg:justify-normal gap-16 rounded-[110px] border-[1px] border-neutral-800 bg-[rgba(14, 14, 14, 0.70)]backdrop-blur-xl'>
          <Link href="/">
            <Image src={Logo} alt="Logo" width={logoWidth} height={logoHeight} />
          </Link>

          {width && width > 750 && (
            <nav className='flex items-center justify-center'>
              <a href="/work" className='px-4 py-2 text-neutral-400 text-center font-jakarta text-[12px] leading-[18px] tracking-[1.2px] uppercase font-medium'>Work</a>
              <a href="#" className='px-4 py-2 text-neutral-400 text-center font-jakarta text-[12px] leading-[18px] tracking-[1.2px] uppercase font-medium'>Services</a>
              <a href="#" className='px-4 py-2 text-neutral-400 text-center font-jakarta text-[12px] leading-[18px] tracking-[1.2px] uppercase font-medium'>Contact</a>
            </nav>
          )}

          <button className='flex items-center justify-center px-4 py-3 rounded-[44px] backdrop-blur-[6px] border-[1px] border-slate-200/20 bg-[linear-gradient(0deg,rgba(255,255,255,0.05)_0%,rgba(255,255,255,0.10)_100%)] hover:bg-slate-200/40 bg-[rgba(255, 255, 255, 0.15)] cursor-pointer backdrop-blur-md transition-colors'>
            <Link href="#project-request" className='text-neutral-50 text-center font-jakarta text-[12px] leading-[18px] tracking-[1.2px] uppercase font-medium'>Start a project</Link>
          </button>
        </div>
      )}
    </>
  )
}

export default Navbar;