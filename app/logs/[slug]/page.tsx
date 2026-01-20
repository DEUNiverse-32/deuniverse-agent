import React from 'react';
import { getPostBySlug } from '../../../lib/posts';

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

    if (!post) return <div className="p-24 text-red-900 font-mono">ACCESS_DENIED: Log entry not found or clearance insufficient.</div>;

      return (
          <div className="min-h-screen bg-[#050510] text-slate-300 p-8 md:p-24 font-mono noise-overlay">
                <div className="max-w-3xl mx-auto border border-slate-900 bg-black/40 p-12 relative shadow-2xl">
                        <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-slate-700"></div>
                                <div className="absolute bottom-0 right-0 w-8 ih-8 border-b border-r border-slate-700"></div>

                                        <a href="#home" className="text-[10px] uppercase tracking-[0.3em] text-slate-500 hover:text-red-900 transition-colors mb-12 block">
                                                  [ RETURN_TO_TERMINAL ]
                                                          </a>

                                                                  <div className="mb-12 border-b border-slate-800 pb-8">
                                                                            <span className="text-red-900 font-bold text-[10px] tracking-widest block mb-4 uppercase">
                                                                                        LOG ENTRY: {post.slug}
                                                                                                  </span>
                                                                                                            <h1 className="text-4xl font-industrial font-bold text-white mb-2 uppercase tracking-tight">
                                                                                                                        {post.title}
                                                                                                                                  </h1>
                                                                                                                                            <p className="text-xs text-slate-600 tracking-widest">{post.date}</p>
                                                                                                                                                    </div>

                                                                                                                                                            <div className="whitespace-pre-wrap text-slate-400 leading-relaxed text-lg">
                                                                                                                                                                       {post.content}
                                                                                                                                                                               </div>

                                                                                                                                                                                       <div className="mt-24 pt-8 border-t border-slate-900 flex justify-between items-center text-[9px] text-slate-700 tracking-widest">
                                                                                                                                                                                                 <span>DEUNIVERSE_SECURE_NODE_V4</span>
                                                                                                                                                                                                           <span>END_OF_DOCUMENT</span>
                                                                                                                                                                                                                   </div>
                                                                                                                                                                                                                         </div>
                                                                                                                                                                                                                             </div>
                                                                                                                                                                                                                               );
                                                                                                                                                                                                                               }