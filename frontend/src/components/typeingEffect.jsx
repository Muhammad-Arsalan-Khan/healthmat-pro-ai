import { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'

const words = ['Daily Meals', 'Health Care', 'Free Education', 'Support Services', 'Monthly Family Support', 'Clean Water & Lot More']

const TypingEffect = () => {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex]
    const speed = isDeleting ? 50 : 100

    const timeout = setTimeout(() => {
      setText(currentWord.slice(0, charIndex))

      if (!isDeleting && charIndex < currentWord.length) {
        setCharIndex((prev) => prev + 1)
      } else if (isDeleting && charIndex > 0) {
        setCharIndex((prev) => prev - 1)
      } else if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => setIsDeleting(true), 1000)
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, wordIndex])

  return (
    <Box display="flex" flexDirection={"column"} justifyContent="center"  height="200px"  >
      <Typography variant="h5" gutterBottom fontWeight="600" sx={{ fontSize: {xs: "20px" }}}>
        The largest NGO offering free&nbsp;
      </Typography>

      {/* Line 2: Typing Animation */}
        <Typography variant="h5" sx={{ color: 'primary.main' }}>
        <Box component="span" fontWeight="600" sx={{ borderRight: '2px solid', paddingRight: '4px',fontSize: {xs: "20px" } }}>
          {text}
        </Box>
      </Typography>
    </Box>
  );
};

export default TypingEffect
