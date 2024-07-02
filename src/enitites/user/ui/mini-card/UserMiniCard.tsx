import React, { HTMLAttributes } from 'react'
import userIcon from '../../assets/user-icon.svg'

interface UserMiniCardProps extends HTMLAttributes<HTMLImageElement> {}

export default function UserMiniCard({className}: UserMiniCardProps) {
  return (
    <img className={`user-mini-card ${className}`} src={userIcon}/>
  )
}