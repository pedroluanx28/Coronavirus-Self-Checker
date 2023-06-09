import '../css/Home.css'
import { BsInstagram, BsGithub } from 'react-icons/bs'

export default function Footer() {
  return (
    <div className="footer">
      <p className='myName'>Coronavirus Self Checker | Pedro Luan, 2023</p>
      <div className='moreForMe'>
        <a className='myLinks' href="https://github.com/pedroluanx28" target='_blank'><BsGithub/></a>
        <a className='myLinks' href="https://www.instagram.com/luanx28_/" target='_blank'><BsInstagram/></a>
      </div>
    </div>
  )
}
