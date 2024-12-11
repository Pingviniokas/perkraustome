const VideoBackground = () => (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute w-full h-full object-cover"
    >
      <source src="/videos/mb.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
  
  export default VideoBackground;
  