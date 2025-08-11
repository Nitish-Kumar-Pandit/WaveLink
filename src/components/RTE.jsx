import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import conf from "../conf/conf";
import appwriteService from "../appwrite/config";

export default function RTE({ name, control, label, defaultValue = "" }) {
  // Debug: Log API key to verify it's loading
  console.log('TinyMCE API Key:', conf.tinymceAPI ? 'Loaded' : 'Missing');

  return (
    <div className="w-full">
      {label && (
        <label className="inline-block mb-1 pl-1 text-sm font-medium text-gray-900">
          {label}
        </label>
      )}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey={conf.tinymceAPI || 'ajvrno3yi5mbzkwc77hzt9i2qjtroulzdk02slay0a5e8uff'}
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: false, // Disable menubar for mobile

              // Responsive configuration
              toolbar_mode: 'sliding',
              toolbar_sticky: true,

              // Mobile-optimized plugins (removed problematic plugins)
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount', 'emoticons',
                'codesample', 'pagebreak', 'nonbreaking', 'quickbars', 'autoresize'
              ],

              // Responsive toolbar configuration
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image media table codesample | forecolor backcolor | emoticons charmap | code fullscreen preview | help',

              // Mobile-specific toolbar
              toolbar_groups: {
                formatting: {
                  icon: 'format',
                  tooltip: 'Formatting',
                  items: 'bold italic underline strikethrough | forecolor backcolor | removeformat'
                },
                alignment: {
                  icon: 'align-left',
                  tooltip: 'Alignment',
                  items: 'alignleft aligncenter alignright alignjustify'
                },
                lists: {
                  icon: 'list-num-default',
                  tooltip: 'Lists',
                  items: 'numlist bullist | outdent indent'
                },
                insert: {
                  icon: 'plus',
                  tooltip: 'Insert',
                  items: 'link image media table codesample emoticons charmap'
                }
              },

              // Mobile-responsive settings
              min_height: 300,
              max_height: 600,
              autoresize_bottom_margin: 50,

              // Enhanced formatting options
              block_formats: 'Paragraph=p; Heading 1=h1; Heading 2=h2; Heading 3=h3; Heading 4=h4; Heading 5=h5; Heading 6=h6; Preformatted=pre; Blockquote=blockquote',

              // Enhanced font options
              font_family_formats: 'Inter=Inter,sans-serif; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier,monospace; Georgia=georgia,palatino,serif; Helvetica=helvetica; Impact=impact,chicago; Tahoma=tahoma,arial,helvetica,sans-serif; Times New Roman=times new roman,times,serif; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva',

              font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 20pt 24pt 28pt 32pt 36pt 48pt 72pt',

              // Image handling
              image_advtab: true,
              image_uploadtab: true,
              file_picker_types: 'image',

              // Table options
              table_default_attributes: {
                'border': '1'
              },
              table_default_styles: {
                'border-collapse': 'collapse',
                'width': '100%'
              },

              // Auto-save and other features
              autosave_ask_before_unload: true,
              autosave_interval: '30s',
              autosave_prefix: '{path}{query}-{id}-',
              autosave_restore_when_empty: false,
              autosave_retention: '2m',

              // Content filtering - Prevent image pasting to avoid content length issues
              paste_data_images: false, // Disable pasting images as base64
              paste_as_text: false,
              paste_auto_cleanup_on_paste: true,
              paste_remove_styles_if_webkit: true,

              // Advanced features
              contextmenu: 'link image table',
              quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              quickbars_insert_toolbar: 'quickimage quicktable',

              // Accessibility
              a11y_advanced_options: true,

              // Custom content styles
              content_style: `
                body {
                  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  font-size: 14px;
                  background-color: #ffffff !important;
                  color: #111827 !important;
                  padding: 20px;
                  border-radius: 8px;
                  line-height: 1.6;
                  max-width: none;
                }
                * {
                  color: #111827 !important;
                }
                h1, h2, h3, h4, h5, h6 {
                  font-weight: 600;
                  margin-top: 1.5em;
                  margin-bottom: 0.5em;
                  color: #1f2937;
                }
                h1 { font-size: 2.25em; }
                h2 { font-size: 1.875em; }
                h3 { font-size: 1.5em; }
                h4 { font-size: 1.25em; }
                h5 { font-size: 1.125em; }
                h6 { font-size: 1em; }
                p { margin-bottom: 1em; }
                blockquote {
                  border-left: 4px solid #f97316;
                  padding-left: 1em;
                  margin: 1.5em 0;
                  font-style: italic;
                  color: #6b7280;
                }
                code {
                  background-color: #f3f4f6;
                  padding: 0.2em 0.4em;
                  border-radius: 3px;
                  font-family: 'Courier New', monospace;
                }
                pre {
                  background-color: #1f2937;
                  color: #f9fafb;
                  padding: 1em;
                  border-radius: 6px;
                  overflow-x: auto;
                }
                table {
                  border-collapse: collapse;
                  width: 100%;
                  margin: 1em 0;
                }
                table td, table th {
                  border: 1px solid #d1d5db;
                  padding: 8px 12px;
                }
                table th {
                  background-color: #f9fafb;
                  font-weight: 600;
                }
                img {
                  max-width: 100%;
                  height: auto;
                  border-radius: 6px;
                }
                ul, ol {
                  padding-left: 1.5em;
                  margin-bottom: 1em;
                }
                li {
                  margin-bottom: 0.5em;
                }
              `,

              // Mobile-specific configuration
              mobile: {
                theme: 'silver',
                plugins: [
                  'autosave', 'lists', 'autolink', 'link', 'image', 'code',
                  'fullscreen', 'quickbars', 'autoresize', 'table', 'media',
                  'emoticons', 'charmap', 'codesample', 'searchreplace', 'preview'
                ],
                toolbar: 'undo redo | formatselect | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image media table | forecolor | emoticons | code fullscreen preview',
                menubar: false,
                toolbar_mode: 'sliding',
                quickbars_selection_toolbar: 'bold italic underline | quicklink h2 h3 blockquote | forecolor',
                quickbars_insert_toolbar: 'quickimage quicktable codesample emoticons',
                content_style: `
                  body {
                    font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
                    font-size: 16px;
                    line-height: 1.6;
                    padding: 12px;
                    margin: 0;
                    background-color: #ffffff;
                    color: #111827;
                  }
                  p {
                    margin-bottom: 1em;
                    color: #111827;
                  }
                  h1, h2, h3, h4, h5, h6 {
                    font-weight: 600;
                    margin-top: 1.2em;
                    margin-bottom: 0.5em;
                    color: #1f2937;
                  }
                  pre, code {
                    background-color: #f3f4f6;
                    color: #1f2937;
                    padding: 4px 8px;
                    border-radius: 4px;
                    font-family: 'Courier New', monospace;
                  }
                  blockquote {
                    border-left: 4px solid #f97316;
                    padding-left: 1em;
                    margin: 1.5em 0;
                    font-style: italic;
                    color: #374151;
                  }
                `
              },

              // Touch-friendly settings
              toolbar_sticky_offset: 0,

              file_picker_callback: (cb) => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");

                input.onchange = async () => {
                  const file = input.files[0];
                  
                  (async () => {
                    try {
                      const uploadedFile = await appwriteService.uploadFile(file);
                      if (uploadedFile) {
                        const fileUrl = appwriteService.getFileView(uploadedFile.$id);
                        cb(fileUrl, { title: file.name });
                      }
                    } catch (error) {
                      console.error("Error uploading file:", error);
                    }
                  })();
                };
                input.click();
              },

              // Setup function for custom buttons and functionality
              setup: function(editor) {
                editor.on('init', function() {
                  const container = editor.getContainer();
                  const toolbar = container.querySelector('.tox-toolbar');
                  const editorBody = editor.getBody();

                  // Ensure editor content is visible
                  if (editorBody) {
                    editorBody.style.backgroundColor = '#ffffff';
                    editorBody.style.color = '#111827';
                    editorBody.style.minHeight = '200px';
                  }

                  // Add responsive classes
                  if (window.innerWidth <= 768) {
                    container.classList.add('tox-mobile');
                    if (toolbar) {
                      toolbar.style.flexWrap = 'wrap';
                    }
                  }

                  // Handle window resize
                  window.addEventListener('resize', function() {
                    if (window.innerWidth <= 768) {
                      container.classList.add('tox-mobile');
                      if (toolbar) {
                        toolbar.style.flexWrap = 'wrap';
                      }
                    } else {
                      container.classList.remove('tox-mobile');
                      if (toolbar) {
                        toolbar.style.flexWrap = 'nowrap';
                      }
                    }
                  });
                });
              }
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

RTE.propTypes = {
  name: PropTypes.string,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  defaultValue: PropTypes.string,
};
