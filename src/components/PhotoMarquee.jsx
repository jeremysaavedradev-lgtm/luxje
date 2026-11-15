export default function PhotoMarquee({ images, position }) {
  const loopImages = [...images, ...images, ...images];

  const handleImageError = (e) => {
    const currentSrc = e.target.src;
    if (currentSrc.endsWith('.jpg')) {
      e.target.src = currentSrc.replace('.jpg', '.png');
    } else if (currentSrc.endsWith('.png')) {
      e.target.src = currentSrc.replace('.png', '.jpeg');
    }
  };

  return (
    <div className={`marquee-container ${position}`}>
      <div className="marquee-track">
        {loopImages.map((src, index) => (
          <div className="marquee-item" key={index}>
            <img
              src={src}
              alt={`Gatito ${index + 1}`}
              onError={handleImageError}
            />
          </div>
        ))}
      </div>
    </div>
  );
}