function scrollGallery(direction) {
  const track = document.getElementById('galleryTrack');
  const scrollAmount = 310;
  track.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
}