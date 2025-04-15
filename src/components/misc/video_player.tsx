import React, { useEffect } from 'react'
import "./css/video_player.css";
import { HiSpeakerWave } from 'react-icons/hi2';
import { RiVolumeMuteFill } from 'react-icons/ri';
import { GiNextButton, GiPauseButton, GiPlayButton, GiPreviousButton } from 'react-icons/gi';
import { MdOutlineFullscreenExit } from 'react-icons/md';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaAngleLeft } from 'react-icons/fa6';
import { useState, useRef } from 'react';

   const VideoPlayerComponent: React.FC<{ url: string; onclose: () => void; title?: string; desc?: string; }> = ({ url, onclose, title, desc }) => {

        const [showing, setShowing] = useState<{bar: boolean, controls: boolean}>({bar: true, controls: true});
        const videoRef = useRef<HTMLVideoElement | null>(null);
        const [isPlaying, setIsPlaying] = useState(true);
        const [currentTime, setCurrentTime] = useState(0);
        const [duration, setDuration] = useState(0);
        const [isMuted, setIsMuted] = useState(false);
        const [volume, setVolume] = useState(1);
        //const [playing, setPlaying] = useState(urls[0]);

        /*const handleNextVideo = () => {
            const currentIndex = urls.indexOf(playing);
            if (currentIndex < urls.length - 1) {
            setPlaying(urls[currentIndex + 1]);
            setCurrentTime(0);
            }
        };

        const handlePreviousVideo = () => {
            const currentIndex = urls.indexOf(playing);
            if (currentIndex > 0) {
            setPlaying(urls[currentIndex - 1]);
            setCurrentTime(0);
            }
        };*/

        const togglePlayPause = () => {
            if (videoRef.current) {
                if (isPlaying) {
                    videoRef.current.pause();
                } else {
                    videoRef.current.play();
                }
                setIsPlaying(!isPlaying);
            }
        };

        const handleTimeUpdate = () => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
            }
        };

        const handleLoadedMetadata = () => {
            if (videoRef.current) {
                setDuration(videoRef.current.duration);
            }
        };

        const toggleMute = () => {
            if (videoRef.current) {
                videoRef.current.muted = !isMuted;
                setIsMuted(!isMuted);
            }
        };

        const handleVolumeChange = (newVolume: number) => {
            if (videoRef.current) {
                videoRef.current.volume = newVolume;
                setVolume(newVolume);
            }
        };

        useEffect(() => {
            setTimeout(() => {
                setShowing({bar: false, controls: false});
            }, 5000)
        }, []);

        return (
            <div className='video_player_component_container'>
                <div className="video_player_component_content_container">
                    <div
                        onMouseEnter={() => {
                            setShowing((prev) => ({...prev, bar: true}))
                        }}
                        onMouseLeave={() => {
                            setTimeout(() => {
                                setShowing((prev) => ({...prev, bar: false}))
                            }, 5000)
                        }}
                    className={`video_player_component_content_header_container ${!showing.bar && "video_player_component_content_header_container_not_active"}`}>
                        <div className="video_player_component_content_header_back_container" onClick={onclose}>
                            <FaAngleLeft size={25} color='white' />
                        </div>
                        <div className="video_player_component_content_header_caption">
                            <span className='video_player_component_content_header_caption_title'>{(title || "").length > 15 ? (title || "").slice(0, 15) + "...": title}</span>
                            <span className='video_player_component_content_header_caption_description'>{(desc || "").length > 15 ? (desc || "").slice(0, 15) + "...": desc}</span>
                        </div>
                    </div>

                    <div className="video_player_component_content_video_container">
                        <video
                            ref={videoRef}
                            src={url}
                            autoPlay={true}
                            controls={false}
                            className='video_player_component_content_video'
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                        ></video>
                    </div>

                    <div 
                    onMouseEnter={() => setShowing((prev: {bar:boolean, controls:boolean}) => ({...prev, controls: true}))}
                    onMouseLeave={() => setTimeout(() => setShowing((prev: {bar:boolean, controls:boolean}) => ({...prev, controls: false})), 5000)}
                     className={`video_player_component_content_controls_container ${!showing.controls && "video_player_component_content_controls_container_not_active"}`}>
                        <div className="video_player_component_content_controls_top">
                            <div className="video_player_component_content_controls_top_start_finish">
                                <span>{new Date(currentTime * 1000).toISOString().substr(11, 8)}</span>
                                <span>{new Date(duration * 1000).toISOString().substr(11, 8)}</span>
                            </div>
                            <div className="video_player_component_content_controls_top_track_container">
                                <div className="video_player_component_content_controls_top_track">
                                    <div
                                        className="video_player_component_content_controls_top_thumb_line"
                                        style={{ width: `${(currentTime / duration) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        <div className="video_player_component_content_controls_bottom">        <div className="video_player_component_content_controls_bottom_left">
                                {!isMuted && <HiSpeakerWave size={20} onClick={toggleMute} />}
                                {isMuted && <RiVolumeMuteFill size={20} onClick={toggleMute} />}
                                <div className="video_player_component_content_controls_bottom_left_volume_track">
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.01"
                                        value={volume}
                                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="video_player_component_content_controls_bottom_middle">
                                <GiPreviousButton size={20} />
                                {isPlaying ? (
                                    <GiPauseButton size={20} onClick={togglePlayPause} />
                                ) : (
                                    <GiPlayButton size={20} onClick={togglePlayPause} />
                                )}
                                <GiNextButton size={20} />
                            </div>
                            <div className="video_player_component_content_controls_bottom_right">
                                <MdOutlineFullscreenExit size={20} />
                                <BiDotsVerticalRounded size={20} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
 

export default VideoPlayerComponent