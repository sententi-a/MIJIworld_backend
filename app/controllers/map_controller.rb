class MapController < ApplicationController 
    def worldmap
        @pins = Pin.all
        @restinfos = Restinfo.all
    end
    
    def ticket 
        @ticket = Ticket.new(ticket_params)
        
        temp_img = MiniMagick::Image.open('ticket@2x.png')
        img_width = temp_img[:width]
        temp_img.combine_options do |c|

            c.gravity 'Center'
            c.draw "text 0, 0 '#{@ticket.datepick}'"

            c.gravity 'Center'
            c.draw "text 360, -130 '#{@ticket.name}'"

            c.gravity 'Center'
            c.draw "text 360, -65 '#{@ticket.with}'"

            c.gravity 'Center'
            c.draw "text 360, 0 '#{@ticket.menu}'"

            c.gravity 'Center'
            c.draw "text 360, 70 '#{@ticket.anything}'"

            c.stroke('#000000')
            c.strokewidth 1
            c.fill('#000000')
            c.size "#{img_width}x"
            c.pointsize '20'
            c.font "NotoSansCJKkr-Light.otf"

            c.write("practice.png")
        end
        send_file 'practice.png'
        
    end

private 
    def ticket_params
        params.require(:ticket).permit(:datepick, :name, :with, :menu, :anything)
    end
end
