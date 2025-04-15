import { FaFacebook, FaLaptopFile, FaRegFaceSmile } from "react-icons/fa6";
import "./css/compose_post.css";
import React, { useEffect, useRef, useState } from 'react'
import { BiSolidMagicWand } from "react-icons/bi";
import { RiAiGenerate, RiFolderCloudLine, RiRecycleFill } from "react-icons/ri";
import { GoTriangleDown } from "react-icons/go";
import { MdInfoOutline, MdShortText } from "react-icons/md";
import { useWebSocket } from "../../constant/provider";
import * as ReactIcons from "react-icons/fa6";
import IGFeedPreview from "./compose_preview/instagram";
import XFeedPreview from "./compose_preview/x";
import TiktokFYPPreview from "./compose_preview/tiktok";
import LinkedInFeedPreview from "./compose_preview/linkedin";
import { LuMessageSquareMore } from "react-icons/lu";
import { IoMdExit } from "react-icons/io";

interface Props {
    onexit: () => void;
}

const ComposePost: React.FC<Props> = ({onexit}) => {
    const { socialAccounts, setNote } = useWebSocket();
    const [selectedChannel, setSelectedChannel] = useState<string>("");
    useEffect(() => {
        if (socialAccounts && Object.keys(socialAccounts).length > 0) {
            const initialChannel = Object.keys(socialAccounts)[0];
            setSelectedChannel(initialChannel);
        }
    }, [socialAccounts]);


    interface Config {
        caption: string;
        media: string[];
        title?: string; // for platform like youtube
    }
    interface Empty {
        caption: boolean;
        media: boolean;
        title?: boolean;
    }
    const [isPostEmpty, setIsPostEmpty] = useState<Record<string, Empty>>({});
    const [showingPreview, setShowingPreview] = useState<boolean>(false);
    const [showingAI, setShowingAI] = useState<boolean>(false);
    const [config, setConfig] = useState<Record<string, Config>>({})

    useEffect(() => {
        const newConfig: Record<string, Config> = {}; // Create a new object
        if (socialAccounts && Object.keys(socialAccounts).length > 0) {
            for (const platform in socialAccounts) {
                const t = platform as keyof typeof socialAccounts;
                newConfig[t] = {
                    caption: "",
                    media: [],
                    title: "",
                    //media: ["https://media.istockphoto.com/id/537414840/vector/color-in-nature-river-realistic-fantastic-cartoon-style-artwork-scene.jpg?s=612x612&w=0&k=20&c=_uIIbzhHVMimGfGpIUdqUixBwgvBAUyqmAg062B4fLk=","https://media.istockphoto.com/id/1005927988/vector/fantasy-land-grass-and-hill-river-and-tree-with-fantastic-realistic-style.jpg?s=612x612&w=0&k=20&c=wckpkHjKc9TZweV_Zcm9oijL5c7WgHIRpnnBjKZnSrs=","https://img.freepik.com/free-vector/blank-landscape-scene-nature-park-sunset-time_1308-61312.jpg","https://img.freepik.com/free-vector/blank-landscape-scene-nature-park-sunset-time_1308-61312.jpg"],
                }
            }
            setConfig(newConfig);
        }
    }, [socialAccounts]);

    useEffect(() => {
        const newEmpty: Record<string, Empty> = {}; // Create a new object
        if (socialAccounts && Object.keys(socialAccounts).length > 0) {
            for (const platform in socialAccounts) {
                const t = platform as keyof typeof socialAccounts;
                newEmpty[t] = {
                    caption: true,
                    media: true,
                }
            }
            setIsPostEmpty(newEmpty);
        }
    }, [socialAccounts]);


    const platformColor = (key: string) => {
        switch(key){
            case "facebook":
                return "#1877F2";
            case  "instagram":
                return "#E1306C";
            case "tiktok":
                return "#000000";
            case "linkedin":
                return "#0077B5";
            case  "x":
                return "#000000";
            case "google":
                return "#ff0000";
            default:
                return "#1877F2";
        }
    }


    const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // State to track actual file objects
    const fileInputRef = useRef<HTMLInputElement | null>(null);



    // Handle media upload
    const handleMediaUpload = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const files = target.files;
        if (!files) return;

        const selectedFilesArray = Array.from(files).slice(0, 4);
        const allowedExtensions: { [key: string]: string[] } = {
            tiktok: ["mp4", "mov", "avi", "mkv", "webm"],
            google: ["mp4", "mov", "avi", "mkv", "webm"],
            normal: ["jpg", "jpeg", "gif", "png", "webp", "mp4", "mov", "avi", "mkv", "webm"],
        };

        const allowedExtension = allowedExtensions[selectedChannel] || allowedExtensions.normal;
        const updatedMedia = [...(config[selectedChannel]?.media || [])];

        selectedFilesArray.forEach((file) => {
            const extension = file.name.split('.').pop()?.toLowerCase();

            if (allowedExtension.includes(extension || '')) {
                const url = URL.createObjectURL(file);

                // Check if the file is a video
                if (extension && ["mp4", "mov", "avi", "mkv"].includes(extension)) {
                    const videoElement = document.createElement('video');
                    videoElement.src = url;

                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    videoElement.addEventListener('loadedmetadata', () => {
                        canvas.width = videoElement.videoWidth;
                        canvas.height = videoElement.videoHeight;
                        videoElement.currentTime = 0; // Capture thumbnail at the start
                    });

                    videoElement.addEventListener('seeked', () => {
                        if (context) {
                            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                            const thumbnailUrl = canvas.toDataURL('image/png'); // Get thumbnail as data URL
                            updatedMedia.push(thumbnailUrl); // Store thumbnail URL
                            setConfig((prevConfig) => ({
                                ...prevConfig,
                                [selectedChannel]: {
                                    ...prevConfig[selectedChannel],
                                    media: [...updatedMedia],
                                },
                            }));
                        }
                    });

                    videoElement.load(); // Start loading the video
                } else {
                    // If it's an image, just add the URL directly
                    updatedMedia.push(url);
                    setConfig((prevConfig) => ({
                        ...prevConfig,
                        [selectedChannel]: {
                            ...prevConfig[selectedChannel],
                            media: [...updatedMedia],
                        },
                    }));
                }

                // Keep track of the actual file object
                setSelectedFiles((prevFiles) => [...prevFiles, file]);
            } else {
                setNote(`Please upload supported file for ${selectedChannel}: ${allowedExtension.join(', ')}`);
                setTimeout(() => setNote(""), 2500);
            }
        });
    };

    const handleRemoveMedia = (index: number) => {
        // Remove media from config
        const updatedMedia = config[selectedChannel].media.filter((_, i) => i !== index);
        
        // Remove the corresponding file from selectedFiles
        const updatedFiles = selectedFiles.filter((_, i) => i !== index);

        setConfig({
            ...config,
            [selectedChannel]: {
                ...config[selectedChannel],
                media: updatedMedia,
            },
        });

        setSelectedFiles(updatedFiles); // Update the state with remaining files

        // Update the input value to reflect the removed file
        if (fileInputRef.current) {
            // Clear the input value
            fileInputRef.current.value = ""; 

            // Re-assign the remaining selected files back to the input
            const dataTransfer = new DataTransfer();
            updatedFiles.forEach(file => dataTransfer.items.add(file)); // Add remaining files to the DataTransfer object
            fileInputRef.current.files = dataTransfer.files; // Assign the new FileList to the input
        }
    };

    const [isExiting, setIsExiting] = useState<boolean>(false);

    return (
        <div className="compose_post_container">
            {isExiting && <div className="compose_exiting_container">
                <div className="compose_exiting">
                    <div className="compose_exiting_hd">Discard Changes</div>
                    <div className="compose_exiting_body">You'll permanently lose any changes you've made</div>
                    <div className="compose_exiting_buttons">
                        <button className="compose_exiting_button" onClick={() =>  {
                                    const newConfig: Record<string, Config> = {}; // Create a new object
                                    if (socialAccounts && Object.keys(socialAccounts).length > 0) {
                                        for (const platform in socialAccounts) {
                                            const t = platform as keyof typeof socialAccounts;
                                            newConfig[t] = {
                                                caption: "",
                                                media: [],
                                                title: "",
                                                //media: ["https://media.istockphoto.com/id/537414840/vector/color-in-nature-river-realistic-fantastic-cartoon-style-artwork-scene.jpg?s=612x612&w=0&k=20&c=_uIIbzhHVMimGfGpIUdqUixBwgvBAUyqmAg062B4fLk=","https://media.istockphoto.com/id/1005927988/vector/fantasy-land-grass-and-hill-river-and-tree-with-fantastic-realistic-style.jpg?s=612x612&w=0&k=20&c=wckpkHjKc9TZweV_Zcm9oijL5c7WgHIRpnnBjKZnSrs=","https://img.freepik.com/free-vector/blank-landscape-scene-nature-park-sunset-time_1308-61312.jpg","https://img.freepik.com/free-vector/blank-landscape-scene-nature-park-sunset-time_1308-61312.jpg"],
                                            }
                                        }
                                        setConfig(newConfig);
                                        onexit();
                                    }
                        }}>Discard Changes</button>
                        <button className="compose_exiting_button" onClick={() => setIsExiting(false)}>Keep Editing</button>
                    </div>
                </div>
            </div>}

            <div className="compose_post_composer_wrapper">
                <div className="compose_post_composer_header">
                    <div className="compose_post_composer_header_left">Create Post</div>
                    <div className="compose_post_composer_header_right">
                        <button className="compose_post_composer_header_right_preview_btn" onClick={() => {
                            setShowingAI(false);
                            setShowingPreview(true);
                        }}>Preview</button>
                        <button className="compose_post_composer_header_right_exit_btn" onClick={() => {
                            let hasUnsavedChanges = false;
                            for (const object of Object.values(config)) {
                                if (object?.caption !== "" || object?.media?.length > 0) {
                                    setIsExiting(true);
                                    hasUnsavedChanges = true;
                                    break;
                                }
                            }
                            if (!hasUnsavedChanges) {
                                onexit();
                            }
                        }}><IoMdExit size={20}/></button>
                    </div>
                </div>

                <div className="compose_post_composer_channels_wrapper">
                    {Object.keys(socialAccounts).map((key: string, index: number) => (
                        <div key={index} style={{borderColor: platformColor(key)}} onClick={() => setSelectedChannel(key)} className={`compose_post_composer_channel ${selectedChannel === key && "composing_channel"}`}>
                            <img src={socialAccounts[key].picture} alt="" className="compose_post_composer_channel_image" />
                            {key === "facebook" && <FaFacebook size={18} color='#1877F2' className="compose_post_composer_channel_logo" />}
                            {key === "google" && <ReactIcons.FaYoutube size={18} color='#ff0000' className="compose_post_composer_channel_logo" />}
                            {key === "tiktok" && <ReactIcons.FaTiktok size={18} color='#000000' className="compose_post_composer_channel_logo" />}
                            {key === "linkedin" && <ReactIcons.FaLinkedin size={18} color='#0077B5' className="compose_post_composer_channel_logo" />}
                            {key === "instagram" && <ReactIcons.FaInstagram size={18} color='#E1306C' className="compose_post_composer_channel_logo" />}
                            {key === "x" && <ReactIcons.FaSquareXTwitter size={18} color='#000000' className="compose_post_composer_channel_logo" />}
                        </div>
                    ))}
                </div>


                <div className="compose_post_composer_input_controls_wrapper">
                    <textarea value={config[selectedChannel]?.caption || ""} onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                        const value = event.target.value;
                        setConfig({
                            ...config,
                            [selectedChannel]: {
                                ...config[selectedChannel],
                                caption: value,
                            },
                        });
                        if (value !== "") return setIsPostEmpty({
                            ...isPostEmpty, [selectedChannel]: {
                                ...isPostEmpty[selectedChannel], caption: false
                            }
                        });

                        setIsPostEmpty({
                            ...isPostEmpty, [selectedChannel]: {
                                ...isPostEmpty[selectedChannel], caption: true
                            }
                        })
                    }} placeholder="Start Writing or use AI Assistant..." className="compose_post_composer_input"></textarea>
                    <div className="compose_post_composer_panel_wrapper">
                        <div className="compose_post_composer_panel_media_integration">
                            <RiFolderCloudLine className="compose_post_composer_panel_media_integration_icon" />
                        </div>
                        <div className="compose_post_composer_panel_emoji_launcher">
                            <FaRegFaceSmile />
                        </div>
                        <div className="compose_post_composer_panel_ai_launcher" onClick={() => {
                            setShowingPreview(false);
                            setShowingAI(true);
                        }}>
                            <BiSolidMagicWand className="compose_post_composer_panel_ai_launcher_icon" />
                            <span className="compose_post_composer_panel_ai_label">Ai Assistance</span>
                        </div>
                        <div className="compose_post_composer_panel_attach_file_wrapper">
                            <form className="compose_post_composer_panel_file" encType="multipart/form-data">
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    onChange={handleMediaUpload}
                                    name="compose_post_media"
                                    multiple
                                    disabled={config[selectedChannel]?.media?.length === 4}
                                    accept={
                                    selectedChannel === "tiktok" || selectedChannel === "" || selectedChannel === "youtube"
                                        ? "video/*"
                                        : "image/*,video/*"
                                    }
                                    className="compose_post_composer_panel_file"
                                />
                            </form>
                            <FaLaptopFile className="compose_post_composer_panel_file_icon" />
                            <span className="compose_post_composer_panel_attach_file_label">Attach a Media</span>
                        </div>
                    </div>
                </div>


                {config[selectedChannel]?.media?.length > 0 && (
                    <div className="compose_post_composer_panel_media_show_container">
                        {config[selectedChannel].media.map((item: string, index: number) => {
                            // Check if the item is a video thumbnail or image
                            const isVideoThumbnail = item.endsWith('.png') || item.endsWith('.jpg'); // You might want to adjust this based on how you handle video thumbnails

                            return (
                                <div key={index} className="compose_post_composer_panel_media_wrapper">
                                    {isVideoThumbnail ? (
                                        <img src={item} className="compose_post_composer_panel_media_img" alt={`media-${index}`} />
                                    ) : (
                                        <img src={item} className="compose_post_composer_panel_media_img" alt={`media-${index}`} />
                                    )}
                                    <ReactIcons.FaCircleXmark
                                        onClick={() => handleRemoveMedia(index)}
                                        size={20}
                                        className="compose_post_composer_panel_media_logo"
                                    />
                                </div>
                            );
                        })}
                    </div>
                )}


                <div className="compose_post_composer_bottom_wrapper">
                    <button type="button" className="compose_post_composer_bottom_button">
                        <span onClick={() => alert()} className="compose_post_composer_bottom_button_add_to_que">Add to Queue</span>
                        <span className="compose_post_composer_bottom_button_dropdown">
                            <GoTriangleDown size={15} />
                        </span>
                    </button>
                    <button type="button" className="compose_post_composer_bottom_button button_draft">
                        <span onClick={() => alert()} className="compose_post_composer_bottom_button_save_draft">Save Draft</span>
                    </button>
                </div>

            </div>


            <div className={`compose_post_ai_wrapper ${showingAI && !showingPreview && "showing_compose_container"}`}>
                <div className="compose_post_ai_header">
                    <div className="compose_post_ai_header_left">
                        <BiSolidMagicWand className="compose_post_ai_header_left_icon" />
                        <span className="compose_post_ai_header_left_text">AI Assistance</span>
                    </div>
                    <div className="compose_post_ai_header_right"></div>
                </div>


                {isPostEmpty[selectedChannel]?.caption && <div className="compose_post_ai_body_create_container">
                    <span className="compose_post_ai_body_create_input_label">Tell Ai what you want to write about</span>
                    <textarea className="compose_post_ai_body_create_input" placeholder="Eg. Provided a write up to get my music listed"></textarea>
                    <button className="compose_post_ai_body_create_input_generate_button">
                        <BiSolidMagicWand className="compose_post_ai_body_create_input_generate_button_icon" />
                        <span className="compose_post_ai_body_create_input_generate_button_text">Generate</span>
                    </button>
                </div>}

                {!isPostEmpty[selectedChannel]?.caption && <div className="compose_post_ai_body_create_help_container">
                    <button className="compose_post_ai_body_create_help_button">
                        <LuMessageSquareMore />
                        <span>Expand</span>
                    </button>
                    <button className="compose_post_ai_body_create_help_button">
                        <RiRecycleFill />
                        <span>Rephrase</span>
                    </button>
                    <button className="compose_post_ai_body_create_help_button">
                        <MdShortText />
                        <span>Shorten</span>
                    </button>
                    <button className="compose_post_ai_body_create_help_button">
                        <RiAiGenerate />
                        <span>Generate More</span>
                    </button>
                </div>}

                <div className="compose_post_ai_footer_container">

                </div>
            </div>


            <div className={`compose_post_preview_wrapper ${showingPreview && !showingAI && "showing_compose_container"}`}>
                <div className="compose_post_preview_header">
                    <span className="compose_post_preview_header_label">{selectedChannel === "x" ? "Twitter / X" : selectedChannel.charAt(0).toUpperCase() + selectedChannel.slice(1)} Preview</span>
                    <MdInfoOutline className="compose_post_preview_header_icon" />
                </div>

                {config[selectedChannel]?.caption === "" && config[selectedChannel]?.media.length === 0 && <div className="compose_post_preview_body_empty_state_wrapper">
                    <img src="/empty_post.png" alt="" className="compose_post_preview_body_empty_state_image" />
                    <div className="compose_post_preview_body_empty_state_label">See your post's preview here</div>
                </div>}

                {selectedChannel === "facebook" && (!isPostEmpty[selectedChannel]?.caption || config[selectedChannel]?.media.length > 0) && <XFeedPreview data={config[selectedChannel]} />}
                {selectedChannel === "x" && (!isPostEmpty[selectedChannel]?.caption || config[selectedChannel]?.media.length > 0) && <XFeedPreview data={config[selectedChannel]} />}
                {selectedChannel === "instagram" && config[selectedChannel]?.media.length > 0 && <IGFeedPreview data={config[selectedChannel]} />}
                {selectedChannel === "linkedin" && (!isPostEmpty[selectedChannel]?.caption || config[selectedChannel]?.media.length > 0) && <LinkedInFeedPreview data={config[selectedChannel]} />}
                {selectedChannel === "tiktok" && config[selectedChannel]?.media.length > 0 && <TiktokFYPPreview data={config[selectedChannel]} />}
                {selectedChannel === "youtube" && (!isPostEmpty[selectedChannel]?.caption || config[selectedChannel]?.media.length > 0) && <XFeedPreview data={config[selectedChannel]} />}
            </div>

        </div>
    )
}

export default ComposePost