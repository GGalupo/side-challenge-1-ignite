import { useEffect, useState } from "react"

import { Button } from './Button'

import { api } from '../services/api'


interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  onGenreClick: (id: number) => void
  selectedId: number
}

export function SideBar({ onGenreClick, selectedId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([])

  useEffect(() => {
    api.get('/genres')
      .then(response => {
        setGenres(response.data)
      })
  }, [])

  return (
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => onGenreClick(genre.id)}
            selected={selectedId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}