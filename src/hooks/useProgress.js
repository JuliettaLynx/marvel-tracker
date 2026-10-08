// src/hooks/useProgress.js
import { useEffect, useRef, useState } from 'react'

const STORAGE_KEY = 'marvel-tracker-progress-v1'

function normalize(state) {
  const out = {}
  for (const [id, entry] of Object.entries(state || {})) {
    if (!entry || typeof entry !== 'object') continue

    if (entry.seasons !== undefined) {
      const seasons = {}
      for (const [name, n] of Object.entries(entry.seasons)) {
        const num = Number(n) || 0
        if (num > 0) seasons[name] = num
      }
      if (Object.keys(seasons).length === 0) continue
      out[id] = { ...entry, seasons }
      continue
    }

    if (entry.watched) out[id] = { ...entry, watched: true }
  }
  return out
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function save(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {}
}

export function useProgress() {
  const [state, setStateRaw] = useState(() => normalize(load()))
  const [loaded, setLoaded] = useState(false)

  const dirty = useRef(false)
  const timer = useRef(null)

  useEffect(() => { setLoaded(true) }, [])

  const setState = (updater) => {
    dirty.current = true
    setStateRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      return normalize(next)
    })
  }

  useEffect(() => {
    if (!loaded || !dirty.current) return
    clearTimeout(timer.current)
    timer.current = setTimeout(() => save(state), 200)
    return () => clearTimeout(timer.current)
  }, [state, loaded])

  return [state, setState, loaded]
}