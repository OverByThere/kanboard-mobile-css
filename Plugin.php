<?php

namespace Kanboard\Plugin\kanboardMobileCss;

use Kanboard\Core\Plugin\Base;

class Plugin extends Base
{
    public function initialize()
    {
        $this->hook->on("template:layout:css", array("template" => "plugins/kanboardMobileCss/skin.css"));
    }

    public function getPluginName()
    {
        return 'Mobile UI Improvements';
    }

    public function getPluginDescription()
    {
        return t('This plugin add a new stylesheet and override default styles.');
    }

    public function getPluginAuthor()
    {
        return 'OverByDan';
    }

    public function getPluginVersion()
    {
        return '0.0.1';
    }

    public function getPluginHomepage()
    {
        return 'https://github.com/OverByThere/kanboardMobileCss';
    }
}
