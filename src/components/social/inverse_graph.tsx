import { Chart } from 'chart.js';
import React, { useEffect, useRef, useState } from 'react';
import "./css/inverse_graph.css";

interface Props {
    title: string;
    icon: React.ReactNode;
    data: Record<string, any>;
    option?: {
        font?: {
            family?: string;
            weight?: any;
            size?: number;
            style?: any;
        };
        color?: string;
        x?: {
            font?: {
                family?: string;
                weight?: any;
                size?: number;
                style?: any;
            };
            color?: string;
        };
        y?: {
            font?: {
                family?: string;
                weight?: any;
                size?: number;
                style?: any;
            };
            color?: string;
        };
        graph?: {
            style?: "bar" | "line" | "radar" | "pie";
            color?: string;
            borderColor?: [string];
            borderRadius?: number;
            barColors?: [string];
            barThickness?: number;
            flip?: boolean; // flip the graph along x axis
        };
        body?: {
            accent?: string;
            backgroundAccent?: string;
            width?: string;
        };
    };
}

const InverseGraph: React.FC<Props> = ({ title, icon, data, option }) => {
    interface Votes {
        label: string;
        count: number;
    }

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);
    const [votes, setVotes] = useState<Votes[]>([]);
    const labels = votes?.map((vote) => vote.label);

    useEffect(() => {
        setVotes([
            { label: 'Jul', count: 345 },
            { label: 'Aug', count: 234 },
            { label: 'Sep', count: 340 },
            { label: 'Oct', count: 677 },
            { label: 'Nov', count: 1433 },
            { label: 'Dec', count: 532 },
        ]);
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        // Destroy previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create new chart instance and store in ref
        chartRef.current = new Chart(canvasRef.current, {
            type: option?.graph?.style || 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "",
                        data: votes?.map((vote) => vote.count),
                        backgroundColor: option?.graph?.barColors,
                        borderColor: option?.graph?.borderColor,
                        borderRadius: option?.graph?.borderRadius,
                        barThickness: option?.graph?.barThickness,
                        showLine: true,
                        tension: 0.4,
                    },
                ],
            },
            options: {
                indexAxis: "y",
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false,
                        labels: {
                            font: {
                                family: option?.font?.family,
                                size: option?.font?.size,
                                weight: option?.font?.weight,
                                style: option?.font?.style,
                            },
                            color: option?.color,
                        },
                    },
                },
                scales: {
                    x: {
                        ticks: {
                            font: {
                                family: option?.x?.font?.family,
                                size: option?.x?.font?.size,
                                weight: option?.x?.font?.weight,
                                style: option?.x?.font?.style,
                            },
                            color: option?.x?.color,
                        },
                        grid: {
                            display: false,
                        },
                    },
                    y: {
                        ticks: {
                            font: {
                                family: option?.y?.font?.family,
                                size: option?.y?.font?.size,
                            },
                            color: option?.y?.color,
                        },
                        grid: {
                            display: false,
                        },
                        beginAtZero: true,
                    },
                },
                elements: { 
  
                },
                animation: {
                    onComplete: () => {
                        const chartInstance = chartRef.current;
                        const ctx = chartInstance?.ctx;

                        // Draw shadows after the chart has been drawn
                        if (ctx) {
                            const bars = chartInstance?.getDatasetMeta(0).data;
                            bars.forEach((bar) => {
                                const { x, y, width, height } = bar.getProps(['x', 'y', 'width', 'height'], false);

                                // Draw the shadow
                                ctx.save();
                                ctx.fillStyle = option?.body?.backgroundAccent || 'rgba(0, 0, 0, 0.2)'; // Faded shadow color
                                ctx.fillRect(x - width / 1, y, width / 1.15, height / 0.65);
                                ctx.restore();
                            });
                        }
                    },
                },
            },
        });

        // Cleanup function to destroy chart on unmount
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [votes]); // Re-run useEffect when votes change

    return (
        <div style={{ width: option?.body?.width }} className="inverse_graph_container">
            <div className="inverse_graph_header">
                <div className="inverse_graph_left">
                    <div style={{ backgroundColor: option?.body?.backgroundAccent }} className="inverse_graph_left_icon">{icon}</div>
                    <div className="inverse_graph_left_title">{title}</div>
                </div>
            </div>

            <div className={`inverse_graph_body ${option?.graph?.flip && "_flip_inverse_graph"}`}>
                <canvas width={"100%"} height={"100%"} className="inverse_graph" ref={canvasRef}></canvas>
            </div>
        </div>
    );
}

export default InverseGraph;
