import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabase';

// Initialize Supabase client
const supabase = createClient(supabaseConfig.url, supabaseConfig.anonKey);

interface FileUploaderProps {
  coupleNames: string;
  weddingDate: string;
}

const FileUploader = ({ coupleNames, weddingDate }: FileUploaderProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [bucketReady, setBucketReady] = useState(false);
  const [checkingStorage, setCheckingStorage] = useState(true);
  
  // Check if the storage bucket exists and create it if it doesn't
  useEffect(() => {
    const checkAndCreateBucket = async () => {
      setCheckingStorage(true);
      try {
        console.log('Checking Supabase connection with URL:', supabaseConfig.url);
        
        // Check if bucket exists
        const { data, error } = await supabase
          .storage
          .getBucket(supabaseConfig.storageBucket);
        
        if (error) {
          // If bucket doesn't exist, create it
          if (error.message.includes('not found')) {
            console.log('Storage bucket not found, creating...');
            const { data: newBucket, error: createError } = await supabase
              .storage
              .createBucket(supabaseConfig.storageBucket, {
                public: false,
                fileSizeLimit: 100 * 1024 * 1024 // 100MB limit
              });
            
            if (createError) {
              console.error('Error creating bucket:', createError);
              setUploadError('Failed to initialize storage. Please try again later.');
              setCheckingStorage(false);
              return;
            }
            
            console.log('Storage bucket created successfully');
            
            // Create a test folder
            const { error: folderError } = await supabase.storage
              .from(supabaseConfig.storageBucket)
              .upload('test-folder/.gitkeep', new Blob([''], { type: 'text/plain' }));
              
            if (folderError) {
              console.warn('Could not create test folder:', folderError);
            } else {
              console.log('Test folder created successfully');
            }
          } else {
            console.error('Error checking bucket:', error);
            setUploadError('Failed to connect to storage. Please try again later.');
            setCheckingStorage(false);
            return;
          }
        } else {
          console.log('Storage bucket exists:', data);
          
          // List files in the bucket to verify access
          const { data: listData, error: listError } = await supabase.storage
            .from(supabaseConfig.storageBucket)
            .list();
            
          if (listError) {
            console.warn('Could not list bucket contents:', listError);
          } else {
            console.log('Bucket contents:', listData);
          }
        }
        
        setBucketReady(true);
      } catch (err) {
        console.error('Unexpected error checking storage:', err);
        setUploadError('Failed to initialize. Please check your connection.');
      } finally {
        setCheckingStorage(false);
      }
    };
    
    checkAndCreateBucket();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(e.target.files);
      setUploadError('');
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      setUploadError('Please select at least one file to upload');
      return;
    }
    
    if (!bucketReady) {
      setUploadError('Storage is not ready yet. Please try again in a moment.');
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    setUploadError('');
    setUploadSuccess(false);

    try {
      // Process each file
      const totalFiles = files.length;
      let completedFiles = 0;
      let failedUploads = 0;
      let errorMessages = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Validate file size (max 50MB)
        if (file.size > 50 * 1024 * 1024) {
          const errorMsg = `File ${file.name} exceeds 50MB limit and will be skipped`;
          console.warn(errorMsg);
          errorMessages.push(errorMsg);
          failedUploads++;
          continue;
        }
        
        // Validate file type
        const fileExt = file.name.split('.').pop()?.toLowerCase();
        const validTypes = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov', 'avi'];
        if (!fileExt || !validTypes.includes(fileExt)) {
          const errorMsg = `File ${file.name} has invalid type and will be skipped`;
          console.warn(errorMsg);
          errorMessages.push(errorMsg);
          failedUploads++;
          continue;
        }
        
        console.log(`Uploading file ${i + 1}/${totalFiles}: ${file.name}`);
        
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${coupleNames.replace(' & ', '-')}/${fileName}`;

        const { error } = await supabase.storage
          .from(supabaseConfig.storageBucket)
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (error) {
          const errorMsg = `Error uploading ${file.name}: ${error.message}`;
          console.error(errorMsg, error);
          errorMessages.push(errorMsg);
          failedUploads++;
          continue;
        }

        console.log(`Successfully uploaded ${file.name}`);
        completedFiles++;
        setUploadProgress(Math.round((completedFiles / totalFiles) * 100));
      }

      if (failedUploads > 0 && completedFiles === 0) {
        // Show only the first 3 errors to avoid overwhelming the user
        const errorSummary = errorMessages.slice(0, 3).join('\n');
        const additionalErrors = failedUploads > 3 ? `\n...and ${failedUploads - 3} more errors` : '';
        throw new Error(`Failed to upload any files: ${errorSummary}${additionalErrors}`);
      } else if (failedUploads > 0) {
        setUploadSuccess(true);
        // Show detailed error information
        const errorSummary = errorMessages.slice(0, 3).join('\n');
        const additionalErrors = failedUploads > 3 ? `\n...and ${failedUploads - 3} more errors` : '';
        setUploadError(`${completedFiles} files uploaded successfully, but ${failedUploads} files failed:\n${errorSummary}${additionalErrors}`);
      } else {
        setUploadSuccess(true);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
      setUploadError('Failed to upload. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg p-8 my-8 border-2 border-[#e6d7bf] cute-shadow relative overflow-hidden">
      {checkingStorage && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#d2b48c] border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-[#5e503f]">Connecting to storage...</p>
          </div>
        </div>
      )}
      {/* Elegant corner element (top-left) */}
      <div className="absolute top-0 left-0 w-16 h-16 opacity-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 C50,0 100,50 100,100 L0,100 Z" fill="#d2b48c" opacity="0.3" />
          <path d="M20,20 A10,10 0 0,1 30,10 A10,10 0 0,1 40,20 A10,10 0 0,1 30,40 A10,10 0 0,1 20,20" fill="#d2b48c" />
        </svg>
      </div>
      
      {/* Elegant corner element (top-right) */}
      <div className="absolute top-0 right-0 w-16 h-16 opacity-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M100,0 C50,0 0,50 0,100 L100,100 Z" fill="#a98467" opacity="0.3" />
          <path d="M70,30 Q80,20 90,25 Q100,20 100,30 Q110,40 100,45 Q105,55 90,55 Q80,65 70,55 Q60,65 60,45 Q50,40 70,30" fill="#a98467" />
        </svg>
      </div>
      
      {/* Elegant star corner element (bottom-right) */}
      <div className="absolute bottom-0 right-0 w-16 h-16 opacity-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M100,0 C50,0 0,50 0,100 L100,100 Z" fill="#d4ac6e" opacity="0.3" />
          <path d="M80,80 L85,65 L95,60 L85,55 L80,40 L75,55 L65,60 L75,65 Z" fill="#d4ac6e" />
        </svg>
      </div>
      
      {/* Elegant leaf corner element (bottom-left) */}
      <div className="absolute bottom-0 left-0 w-16 h-16 opacity-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path d="M0,0 C50,0 100,50 100,100 L0,100 Z" fill="#b6ad90" opacity="0.3" />
          <circle cx="30" cy="70" r="15" fill="#b6ad90" />
          <circle cx="20" cy="60" r="5" fill="white" opacity="0.5" />
        </svg>
      </div>
      
      <div className="border-b border-[#d2b48c]/30 mb-4"></div>
      
      <h3 className="text-center text-[#d2b48c] wedding-script text-2xl mb-4">Share Your Memories</h3>
      
      <div className="flex items-center justify-center mb-4">
        <div className={`w-3 h-3 rounded-full mr-2 ${bucketReady ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-[#5e503f]">
          {bucketReady ? 'Storage connected' : 'Storage disconnected'}
        </span>
      </div>
      
      <div className="mb-6">
        <label 
          htmlFor="file-upload" 
          className="block w-full cursor-pointer text-center py-6 px-4 rounded-lg border border-[#d2b48c] hover:border-[#a98467] transition-colors bg-white shadow-sm"
        >
          <div className="flex flex-col items-center justify-center space-y-3">
            {/* Simple upload icon */}
            <div className="w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-[#d2b48c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            
            <span className="text-[#5e503f] font-medium text-lg">
              {files && files.length > 0 
                ? `${files.length} file${files.length > 1 ? 's' : ''} selected` 
                : 'Select photos or videos'}
            </span>
            <span className="text-sm text-[#a98467]">Click to browse your files</span>
          </div>
          
          <input 
            id="file-upload" 
            name="file-upload" 
            type="file" 
            accept="image/*,video/*" 
            multiple 
            className="hidden" 
            onChange={handleFileChange} 
            disabled={uploading}
          />
        </label>
      </div>

      {files && files.length > 0 && (
        <div className="mb-6">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full py-3 px-6 bg-[#d2b48c] hover:bg-[#a98467] text-white font-medium rounded-md shadow-sm transition-all disabled:bg-gray-300"
          >
            <span>
              {uploading ? 'Uploading...' : 'Share Your Memories'}
            </span>
          </button>
          
          <div className="border-t border-[#d2b48c]/20 my-4"></div>
        </div>
      )}

      {uploading && (
        <div className="mb-6">
          <div className="w-full bg-gray-100 rounded-md h-2">
            <div 
              className="bg-[#d2b48c] h-2 rounded-md transition-all duration-300 ease-in-out" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm text-[#5e503f] mt-2">{uploadProgress}% Complete</p>
        </div>
      )}

      {uploadSuccess && (
        <div className="p-4 bg-[#f5f5f5] text-[#5e503f] rounded-md mb-4 border border-[#d2b48c]/30 text-center">
          <span className="block font-medium mb-1">Thank you!</span>
          <span>Your files have been shared successfully.</span>
        </div>
      )}

      {uploadError && (
        <div className="p-4 bg-[#ffb6c1]/10 text-[#6d6875] rounded-2xl mb-4 border-2 border-[#ffb6c1] text-center cute-shadow">
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <div className="wedding-script text-lg">
              {uploadError.split('\n').map((line, i) => (
                <div key={i} className={i > 0 ? 'mt-1' : ''}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;