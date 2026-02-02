interface UserInfoProps {
  name: string
  about: string
  age?: number
  education: string
  profileImageUrl: string
}

export const MyData: UserInfoProps = {
  name: 'Rohit',
  about:
    'Full-stack developer focused on web engineering, modern JavaScript frameworks, and backend systems. Building clean, scalable products with great DX.',
  education: 'BSC CS Student',
  profileImageUrl: '/profile/avatar.png',
}
